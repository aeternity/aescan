<template>
  <monaco-editor
    v-model="contractCode.source[0].content "
    class="editor"
    lang="aes"
    :options="{
      lineHeight: 20,
      fontFamily: 'Roboto Mono',
      fontSize: 16,
      readOnly: true,
    }"/>
  <!--  todo loop-->
  <!--  todo print aci-->
</template>

<script setup>

import { storeToRefs } from 'pinia'
import { useContractVerifiedStore } from '~/stores/contractVerified'

const route = useRoute()

const contractVerifiedStore = useContractVerifiedStore()
const { contractCode } = storeToRefs(contractVerifiedStore)
const { fetchContractCode } = contractVerifiedStore

await fetchContractCode(route.params.id)

defineProps({
  verificationDetails: {
    required: true,
    type: Object,
  },
})

const content = '// ISC License\n' +
    '//\n' +
    '// Copyright (c) 2022, aeternity developers\n' +
    '//\n' +
    '// Credit to Michel Meier & Marco Walz (kryptokrauts.com)\n' +
    '//\n' +
    '// Permission to use, copy, modify, and/or distribute this software for any\n' +
    '// purpose with or without fee is hereby granted, provided that the above\n' +
    '// copyright notice and this permission notice appear in all copies.\n' +
    '//\n' +
    '// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH\n' +
    '// REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY\n' +
    '// AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,\n' +
    '// INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM\n' +
    '// LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE\n' +
    '// OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR\n' +
    '// PERFORMANCE OF THIS SOFTWARE.\n' +
    '\n' +
    '// THIS IS NOT SECURITY AUDITED\n' +
    '// DO NEVER USE THIS WITHOUT SECURITY AUDIT FIRST\n' +
    '\n' +
    '@compiler >= 6\n' +
    '\n' +
    'include "List.aes"\n' +
    'include "Option.aes"\n' +
    'include "Set.aes"\n' +
    'include "String.aes"\n' +
    '\n' +
    '// This contract provides multi signature based on generalized accounts.\n' +
    '// A transaction can be proposed by one of the signers which are registered during contract deployment.\n' +
    '// The transaction must be confirmed by a certain amount of signers. This is also defined during contract deployment.\n' +
    '// Proposing a transaction automatically counts as confirmation.\n' +
    '// When proposing a tx, the signer can define a TTL until the proposed tx needs to be confirmed and authorized.\n' +
    '// If the amount of confirmations is reached, the special function "authorize" can be called by anybody.\n' +
    '// Only one transaction can be handled at the same time.\n' +
    '// Revocation of proposed tx is also possible but requires enough refusals in case it\'s not triggered by the proposer of the tx.\n' +
    'contract SimpleGAMultiSig =\n' +
    '\n' +
    '  datatype event\n' +
    '    = TxProposed(hash, address, int)\n' +
    '    | TxConfirmed(hash, address)\n' +
    '    | TxRefused(hash, address)\n' +
    '    | TxConsensusReached(hash)\n' +
    '    | TxConsensusLost(hash)\n' +
    '    | TxRevoked(hash, address)\n' +
    '    | TxAuthorized(hash)\n' +
    '    | FeeProtectionDisabled(address)\n' +
    '\n' +
    '  record transaction =\n' +
    '    { tx_hash : hash,\n' +
    '      expires_at : int,\n' +
    '      proposed_by : address,\n' +
    '      confirmed_by : Set.set(address),\n' +
    '      refused_by : Set.set(address) }\n' +
    '\n' +
    '  record consensus_info =\n' +
    '    { tx_hash : option(hash),\n' +
    '      confirmations_required : int,\n' +
    '      confirmed_by : list(address),\n' +
    '      refused_by : list(address),\n' +
    '      has_consensus : bool,\n' +
    '      expiration_height : int,\n' +
    '      expired : bool,\n' +
    '      proposed_by : option(address) }\n' +
    '\n' +
    '  record fee_protection =\n' +
    '    { max_fee : int,\n' +
    '      max_gasprice : int }\n' +
    '\n' +
    '  record state =\n' +
    '    { signers : Set.set(address),\n' +
    '      confirmations_required : int,\n' +
    '      current_tx : option(transaction),\n' +
    '      // fee protection currently needs to be set on contract level until it\'s enforced by the procotol itself\n' +
    '      fee_protection : option(fee_protection),\n' +
    '      // if fee protection is enforced by protocol after a future hardfork this can be disabled on contract level\n' +
    '      fee_protection_enabled : bool,\n' +
    '      nonce : int,\n' +
    '      // for applications to know about the correct interface in case this changes in future versions (e.g. fee protection is likely to be removed completely)\n' +
    '      version : string }\n' +
    '\n' +
    '  stateful entrypoint init(confirmations_required : int, signers : Set.set(address)) =\n' +
    '    require(!Set.member(Call.caller, signers), "ERROR_ACCOUNT_OF_GA_MUST_NOT_BE_SIGNER")\n' +
    '    require(Set.size(signers) >= 2, "ERROR_MIN_2_SIGNERS")\n' +
    '    require(Set.size(signers) >= confirmations_required, "ERROR_CONFIRMATIONS_EXCEED_AMOUNT_OF_SIGNERS")\n' +
    '    { signers = signers,\n' +
    '      confirmations_required = confirmations_required,\n' +
    '      current_tx = None,\n' +
    '      // reasonable default values (consulted with Hans)\n' +
    '      fee_protection = Some({ max_fee = 2_000_000_000_000_000, max_gasprice = 10_000_000_000 }),\n' +
    '      fee_protection_enabled = true,\n' +
    '      nonce = 1,\n' +
    '      version = "2.0.0" }\n' +
    '\n' +
    '  // GA authorize function\n' +
    '  stateful entrypoint authorize(nonce : int) : bool =\n' +
    '    let tx = Option.force_msg(state.current_tx, "ERROR_NO_TX_PROPOSED")\n' +
    '    require(nonce >= state.nonce, "ERROR_NONCE_TOO_LOW")\n' +
    '    require(nonce =< state.nonce, "ERROR_NONCE_TOO_HIGH")\n' +
    '    require(!expired(tx), "ERROR_TX_EXPIRED")\n' +
    '    if(state.fee_protection_enabled)\n' +
    '      verify_tx_fee()\n' +
    '    switch(Auth.tx_hash)\n' +
    '      None => abort("ERROR_NO_AUTH_CONTEXT")\n' +
    '      Some(tx_hash) =>\n' +
    '        require(has_consensus(tx), "ERROR_NO_CONSENSUS")\n' +
    '        require(tx.tx_hash == tx_hash, "ERROR_UNEQUAL_HASHES")\n' +
    '        Chain.event(TxAuthorized(tx_hash))\n' +
    '        put(state{ nonce = nonce + 1, current_tx = None })\n' +
    '        true\n' +
    '\n' +
    '  // propose a new tx valid for the given ttl\n' +
    '  stateful entrypoint propose(tx_hash : hash, ttl : Chain.ttl) =\n' +
    '    require(Set.member(Call.caller, state.signers), "ERROR_NOT_AUTHORIZED")\n' +
    '    switch(state.current_tx)\n' +
    '      None => set_current_tx(tx_hash, ttl)\n' +
    '      Some(tx) =>\n' +
    '        require(expired(tx), "ERROR_EXISTING_PROPOSED_TX_NOT_EXPIRED")\n' +
    '        set_current_tx(tx_hash, ttl)\n' +
    '\n' +
    '  // signer confirms the current tx\n' +
    '  stateful entrypoint confirm(tx_hash : hash) =\n' +
    '    let tx = Option.force_msg(state.current_tx, "ERROR_NOTHING_TO_CONFIRM")\n' +
    '    require_valid_signer_and_tx_hash(Call.caller, tx_hash, tx)\n' +
    '    require(!Set.member(Call.caller, tx.confirmed_by), "ERROR_ALREADY_CONFIRMED")\n' +
    '    require(!expired(tx), "ERROR_TX_EXPIRED")\n' +
    '    switch(Set.member(Call.caller, tx.refused_by))\n' +
    '      true =>\n' +
    '        let updated_tx = tx{ refused_by = Set.delete(Call.caller, tx.refused_by),\n' +
    '                        confirmed_by = Set.insert(Call.caller, tx.confirmed_by) }\n' +
    '        confirm_and_update_tx(updated_tx, tx)\n' +
    '      false =>\n' +
    '        let updated_tx = tx{ confirmed_by = Set.insert(Call.caller, tx.confirmed_by) }\n' +
    '        confirm_and_update_tx(updated_tx, tx)\n' +
    '\n' +
    '\n' +
    '  // refuse the current tx\n' +
    '  stateful entrypoint refuse(tx_hash: hash) =\n' +
    '    let tx = Option.force_msg(state.current_tx, "ERROR_NOTHING_TO_REFUSE")\n' +
    '    require_valid_signer_and_tx_hash(Call.caller, tx_hash, tx)\n' +
    '    require(!Set.member(Call.caller, tx.refused_by), "ERROR_ALREADY_REFUSED")\n' +
    '    switch(Set.member(Call.caller, tx.confirmed_by))\n' +
    '      true =>\n' +
    '        let updated_tx = tx{ confirmed_by = Set.delete(Call.caller, tx.confirmed_by),\n' +
    '                        refused_by = Set.insert(Call.caller, tx.refused_by) }\n' +
    '        if(state.confirmations_required - 1 == Set.size(updated_tx.confirmed_by))\n' +
    '          Chain.event(TxConsensusLost(tx.tx_hash))\n' +
    '        refuse_and_revoke(updated_tx)        \n' +
    '      false =>\n' +
    '        let updated_tx = tx{ refused_by = Set.insert(Call.caller, tx.refused_by) }\n' +
    '        refuse_and_revoke(updated_tx)\n' +
    '\n' +
    '  // revoke the current tx and clean state\n' +
    '  stateful entrypoint revoke(tx_hash : hash) =\n' +
    '    let tx = Option.force_msg(state.current_tx, "ERROR_NOTHING_TO_REVOKE")\n' +
    '    require_valid_signer_and_tx_hash(Call.caller, tx_hash, tx)\n' +
    '    require(Call.caller == tx.proposed_by, "ERROR_CALLER_NOT_PROPOSER")\n' +
    '    internal_revoke(tx.tx_hash)\n' +
    '\n' +
    '  stateful entrypoint update_fee_protection(fee_protection : fee_protection) =\n' +
    '    require(state.fee_protection_enabled, "ERROR_FEE_PROTECTION_ALREADY_DISABLED")\n' +
    '    require(Set.member(Call.caller, state.signers), "ERROR_NOT_A_VALID_SIGNER")\n' +
    '    put(state{ fee_protection = Some(fee_protection) })\n' +
    '\n' +
    '  stateful entrypoint disable_fee_protection() =\n' +
    '    require(state.fee_protection_enabled, "ERROR_FEE_PROTECTION_ALREADY_DISABLED")\n' +
    '    require(Set.member(Call.caller, state.signers), "ERROR_NOT_A_VALID_SIGNER")\n' +
    '    put(state{ fee_protection = None, fee_protection_enabled = false })\n' +
    '    Chain.event(FeeProtectionDisabled(Call.caller))\n' +
    '\n' +
    '  // return the contract version\n' +
    '  entrypoint get_version() : string =\n' +
    '    state.version\n' +
    '\n' +
    '  // return if fee protection is enabled\n' +
    '  entrypoint is_fee_protection_enabled() : bool =\n' +
    '    state.fee_protection_enabled\n' +
    '\n' +
    '  // return the fee protection values\n' +
    '  entrypoint get_fee_protection() : option(fee_protection) =\n' +
    '    state.fee_protection\n' +
    '\n' +
    '  // return the current nonce\n' +
    '  entrypoint get_nonce() : int =\n' +
    '    state.nonce\n' +
    '\n' +
    '  // return all signers\n' +
    '  entrypoint get_signers() : list(address) =\n' +
    '    Set.to_list(state.signers)\n' +
    '\n' +
    '  // return the consensus info\n' +
    '  entrypoint get_consensus_info() : consensus_info =\n' +
    '    switch(state.current_tx)\n' +
    '      None => { tx_hash = None,\n' +
    '                confirmations_required = state.confirmations_required,\n' +
    '                confirmed_by = [],\n' +
    '                refused_by = [],\n' +
    '                has_consensus = false,\n' +
    '                expiration_height = 0,\n' +
    '                expired = false,\n' +
    '                proposed_by = None }\n' +
    '      Some(tx) => { tx_hash = Some(tx.tx_hash),\n' +
    '                    confirmations_required = state.confirmations_required,\n' +
    '                    confirmed_by = Set.to_list(tx.confirmed_by),\n' +
    '                    refused_by = Set.to_list(tx.refused_by),\n' +
    '                    has_consensus = has_consensus(tx),\n' +
    '                    expiration_height = tx.expires_at,\n' +
    '                    expired = expired(tx),\n' +
    '                    proposed_by = Some(tx.proposed_by) }\n' +
    '\n' +
    '  stateful function refuse_and_revoke(tx: transaction) =\n' +
    '    put(state{ current_tx = Some(tx) })\n' +
    '    Chain.event(TxRefused(tx.tx_hash, Call.caller))\n' +
    '    if(state.confirmations_required == Set.size(tx.refused_by))\n' +
    '      internal_revoke(tx.tx_hash)\n' +
    '\n' +
    '  stateful function confirm_and_update_tx(updated_tx, tx: transaction) =\n' +
    '    put(state{ current_tx = Some(updated_tx) })\n' +
    '    Chain.event(TxConfirmed(tx.tx_hash, Call.caller))\n' +
    '    if(state.confirmations_required == Set.size(updated_tx.confirmed_by))\n' +
    '      Chain.event(TxConsensusReached(tx.tx_hash))\n' +
    '\n' +
    '  stateful function internal_revoke(tx_hash: hash) =\n' +
    '    put(state{ current_tx = None })\n' +
    '    Chain.event(TxRevoked(tx_hash, Call.caller))\n' +
    '\n' +
    '  // verify tx fee (fee protection which is required right now)\n' +
    '  function verify_tx_fee() =\n' +
    '    let fee_protection = Option.force(state.fee_protection)\n' +
    '    require(Call.fee =< fee_protection.max_fee, "ERROR_MAX_FEE_EXCEEDED")\n' +
    '    require(Call.gas_price =< fee_protection.max_gasprice, "ERROR_MAX_GASPRICE_EXCEEDED")\n' +
    '\n' +
    '  // validate if enough signers have confirmed\n' +
    '  function has_consensus(tx: transaction) : bool =\n' +
    '    Set.size(tx.confirmed_by) >= state.confirmations_required\n' +
    '\n' +
    '  // require that given address is within the list of signers\n' +
    '  function require_valid_signer_and_tx_hash(addr : address, tx_hash_to_verify : hash, current_tx : transaction) =\n' +
    '    require(Set.member(addr, state.signers) && current_tx.tx_hash == tx_hash_to_verify, "ERROR_NOT_AUTHORIZED")\n' +
    '\n' +
    '  // check if current_tx is expired\n' +
    '  function expired(tx: transaction) : bool =\n' +
    '    Chain.block_height > tx.expires_at\n' +
    '\n' +
    '  // set current tx to state and emit new proposed event\n' +
    '  stateful function set_current_tx(tx_hash : hash, ttl : Chain.ttl) =\n' +
    '    let new_tx = { tx_hash = tx_hash,\n' +
    '                   expires_at = expiration_height(ttl),\n' +
    '                   proposed_by = Call.caller,\n' +
    '                   confirmed_by = Set.insert(Call.caller, Set.new()),\n' +
    '                   refused_by = Set.new() }\n' +
    '    put(state{ current_tx = Some(new_tx) })\n' +
    '    Chain.event(TxProposed(new_tx.tx_hash, new_tx.proposed_by, new_tx.expires_at))\n' +
    '\n' +
    '  // compute the expiration height depending on the ttl type\n' +
    '  function expiration_height(ttl : Chain.ttl) : int =\n' +
    '    switch(ttl)\n' +
    '      FixedTTL(height) => height\n' +
    '      RelativeTTL(relative_ttl) => Chain.block_height + relative_ttl'
</script>

<style>
.editor {
  height: 400px;
}
</style>
