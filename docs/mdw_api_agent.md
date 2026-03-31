# Aeternity Middleware API
> base: `$MIDDLEWARE_URL/v3` · 76 endpoints

**[pg]** = `limit:int` `direction:forward|backward` `cursor` `scope:gen:N-M`
**notation**: `*p` required path · `q` optional query · `q:type` typed · `q=a|b` enum · `(=x)` default

## /accounts
`GET /accounts/{accountId}/activities`  owned_only:boolean  type=transactions|aexn|aex9|aex141|contract|transfers|claims|swaps  [pg]  → paged[{block_hash,block_time,height,type,payload}]
`GET /accounts/{accountId}/aex141/tokens`  contract  [pg]  → paged[{contract_id,owner_id,token_id}]
`GET /accounts/{accountId}/aex9/balances`  → paged[{amount,block_hash,contract_id,decimals,height,token_name,token_symbol,tx_hash,tx_index,tx_type}]
`GET /accounts/{accountId}/dex/swaps`  [pg]  → paged[{amounts,action,caller,from_token,to_token,log_idx,to_account,tx_hash,from_contract,to_contract,from_amount,to_amount,...}]
`GET /accounts/{accountId}/names/claims`  [pg]  → paged[{active_from,source_tx_hash,source_tx_type,block_hash,height,tx,internal_source}]
`GET /accounts/{accountId}/names/pointees`  → paged[{active,name,key,block_hash,tx,source_tx_type,source_tx_hash,block_height,block_time}]
`GET /accounts/{accountId}/transactions/count`  → {contract_create_tx,contract_call_tx,ga_attach_tx,ga_meta_tx,channel_close_mutual_tx,channel_close_solo_tx,channel_create_tx,channel_deposit_tx,channel_force_progress_tx,channel_set_delegates_tx,...}

## /aex141
`GET /aex141`  by=creation|name|symbol  prefix  exact  [pg]  → paged[{base_url,contract_id,contract_tx_hash,extensions,limits,invalid,creation_time,block_height}]
`GET /aex141/{contractId}/templates`  [pg]  → paged[{contract_id,edition,log_idx,template_id,tx_hash}]
`GET /aex141/{contractId}/templates/{templateId}/tokens`  [pg]  → paged[{owner_id,log_idx,token_id,tx_hash}]
`GET /aex141/{contractId}/tokens`  [pg]  → paged[{contract_id,owner_id,token_id}]
`GET /aex141/{contractId}/tokens/{tokenId}`  → {contract_id,owner_id,token_id,metadata}
`GET /aex141/{contractId}/transfers`  from  to  [pg]  → paged[{block_height,contract_id,log_idx,micro_index,micro_time,recipient,sender,token_id,tx_hash}]
`GET /aex141/{id}`  → {base_url,contract_id,contract_tx_hash,extensions,limits,invalid,creation_time,block_height}

## /aex9
`GET /aex9`  by=creation|name|symbol  prefix  exact  [pg]  → paged[{contract_id,contract_tx_hash,initial_supply,event_supply,decimals,extensions,holders,name,symbol,invalid}]
`GET /aex9/count`  → {data}
`GET /aex9/{contractId}/balances`  by  block_hash  [pg]  → paged[{account_id,amount,block_hash,contract_id,height,last_tx_hash,last_log_idx}]
`GET /aex9/{contractId}/balances/{accountId}`  hash  → {account,amount,contract}
`GET /aex9/{contractId}/balances/{accountId}/history`  [pg]  → paged[{account,amount,contract,height}]
`GET /aex9/{id}`  → {contract_id,contract_tx_hash,initial_supply,event_supply,decimals,extensions,holders,name,symbol,invalid}

## /channels
`GET /channels`  state=active|inactive  [pg]  → paged[{active,amount,channel,channel_reserve,delegate_ids,initiator,initiator_amount,last_updated_height,last_updated_tx_type,last_updated_time,last_updated_tx_hash,lock_period,...}]
`GET /channels/{id}`  → {active,amount,channel,channel_reserve,delegate_ids,initiator,initiator_amount,last_updated_height,last_updated_tx_type,last_updated_time,...}

## /contracts
`GET /contracts/calls`  [pg]  → paged[{block_hash,call_tx_hash,contract_id,contract_tx_hash,function,height,internal_tx,local_idx,micro_index}]
`GET /contracts/logs`  contract_id  event  function  function_prefix  data  aexn-args:boolean  [pg]  → paged[{args,block_hash,block_time,call_tx_hash,contract_id,contract_tx_hash,data,event_hash,event_name,ext_caller_contract_id,ext_caller_contract_tx_hash,height,...}]
`GET /contracts/{id}`  → {aexn_type,block_hash,contract,source_tx_hash,source_tx_type,create_tx}

## /dex
`GET /dex/swaps`  [pg]  → paged[{amounts,action,caller,from_token,to_token,log_idx,to_account,tx_hash,from_contract,to_contract,from_amount,to_amount,...}]
`GET /dex/{contract_id}/swaps`  [pg]  → paged[{amounts,action,caller,from_token,to_token,log_idx,to_account,tx_hash,from_contract,to_contract,from_amount,to_amount,...}]

## /hyperchain
`GET /hyperchain/epochs`  [pg]  → paged[{epoch,first,last,length,seed,last_pin_height,parent_block_hash,last_leader,epoch_start_time,validators}]
`GET /hyperchain/epochs/top`  → {epoch,first,last,length,seed,last_pin_height,parent_block_hash,last_leader,epoch_start_time,validators}
`GET /hyperchain/schedule`  [pg]  → paged[{height,leader}]
`GET /hyperchain/schedule/height/{height}`  → {height,leader}
`GET /hyperchain/validators`  [pg]  → paged[{epoch,validator,total_stakes,delegates,rewards_earned,pinning_history}]
`GET /hyperchain/validators/{validator}`  → {epoch,validator,total_stakes,delegates,rewards_earned,pinning_history}
`GET /hyperchain/validators/{validator}/delegates`  [pg]  → paged[{epoch,delegate,stake,validator}]
`GET /hyperchain/validators/{validator}/delegates/top`  [pg]  → paged[{epoch,delegate,stake,validator}]

## /key-blocks
`GET /key-blocks`  [pg]  → paged
`GET /key-blocks/{hash_or_kbi}`  → {hash,height,prev_hash,prev_key_hash,state_hash,miner,beneficiary,flags,target,pow,...}|{beneficiary_reward,flags,micro_blocks_count,transactions_count}
`GET /key-blocks/{hash_or_kbi}/micro-blocks`  [pg]  → paged

## /micro-blocks
`GET /micro-blocks/{hash}`  → {hash,height,pof_hash,prev_hash,prev_key_hash,state_hash,txs_hash,signature,time,version}|{micro_block_index,transactions_count,gas,flags}
`GET /micro-blocks/{hash}/transactions`  → paged[{block_hash,block_height,encoded_tx,hash,micro_index,micro_time,signatures,tx}]

## /names
`GET /names`  by  owned_by  prefix  state  [pg]  → paged[{active,hash,active_from,approximate_activation_time,approximate_expire_time,expire_height,pointers,auction,auction_timeout,ownership,name,name_fee,...}]
`GET /names/auctions`  [pg]  → paged[{auction_end,activation_time,approximate_expire_time,last_bid,name,name_fee,claims_count}]
`GET /names/auctions/{id}`  [pg]  → {auction_end,activation_time,approximate_expire_time,last_bid,name,name_fee,claims_count}
`GET /names/auctions/{id}/claims`  [pg]  → {data}
`GET /names/count`  owned_by  → integer
`GET /names/{id}`  → {active,hash,active_from,approximate_activation_time,approximate_expire_time,expire_height,pointers,auction,auction_timeout,ownership,...}
`GET /names/{id}/claims`  [pg]  → paged[{active_from,source_tx_hash,source_tx_type,block_hash,height,tx,internal_source}]
`GET /names/{id}/transfers`  [pg]  → paged[{active_from,block_hash,height,source_tx_hash,source_tx_type,tx,internal_source}]
`GET /names/{id}/updates`  [pg]  → paged[{active_from,block_hash,height,source_tx_hash,source_tx_type,tx,internal_source}]

## /oracles
`GET /oracles`  state  [pg]  → paged[{active,active_from,approximate_expire_time,expire_height,register_time,register_tx_hash,format,oracle,query_fee,register}]
`GET /oracles/{id}`  → {active,active_from,approximate_expire_time,expire_height,register_time,register_tx_hash,format,oracle,query_fee,register}
`GET /oracles/{id}/extends`  → paged[{block_hash,height,source_tx_hash,source_tx_type,tx}]
`GET /oracles/{id}/queries`  → paged
`GET /oracles/{id}/responses`  → paged

## /stats
`GET /stats`  → {miners_count,fees_trend,last_24hs_average_transaction_fees,last_24hs_transactions,max_transactions_per_second,max_transactions_per_second_block_hash,transactions_trend}
`GET /stats/active-accounts`  interval_by=day|week|month  [pg]  → paged[{count,start_date,end_date}]
`GET /stats/aex9-transfers`  interval_by=day|week|month  min_start_date  max_start_date  [pg]  → paged[{count,start_date,end_date}]
`GET /stats/blocks`  interval_by=day|week|month  min_start_date  max_start_date  type=key|micro  [pg]  → paged[{count,start_date,end_date}]
`GET /stats/contracts`  interval_by=day|week|month  min_start_date  max_start_date  [pg]  → paged[{count,start_date,end_date}]
`GET /stats/delta`  [pg]  → paged[{height,auctions_started,block_reward,burned_in_auctions,channels_closed,channels_opened,contracts_created,dev_reward,names_activated,names_expired,names_revoked,oracles_expired,...}]
`GET /stats/difficulty`  interval_by=day|week|month  min_start_date  max_start_date  [pg]  → paged[{count,start_date,end_date}]
`GET /stats/hashrate`  interval_by=day|week|month  min_start_date  max_start_date  [pg]  → paged[{count,start_date,end_date}]
`GET /stats/miners`  [pg]  → paged[{miner,total_reward}]
`GET /stats/miners/top`  interval_by=day|week|month  min_start_date  max_start_date  type=key|micro  [pg]  → paged[{miner,blocks_mined,start_date,end_date}]
`GET /stats/names`  interval_by=day|week|month  min_start_date  max_start_date  [pg]  → paged[{count,start_date,end_date}]
`GET /stats/total`  [pg]  → paged[{height,contracts,locked_in_auctions,burned_in_auctions,locked_in_channels,active_auctions,active_names,inactive_names,active_oracles,inactive_oracles,open_channels,sum_block_reward,...}]
`GET /stats/total-accounts`  interval_by=day|week|month  [pg]  → paged[{count,start_date,end_date}]
`GET /stats/transactions`  interval_by=day|week|month  min_start_date  max_start_date  tx_type  [pg]  → paged[{count,start_date,end_date}]
`GET /stats/transactions/total`  min_start_date  max_start_date  tx_type  → integer

## /transactions
`GET /transactions`  type:array  type_group:array  account  contract  channel  oracle  sender_id  recipient_id  entrypoint  [pg]  → paged[{block_hash,block_height,encoded_tx,hash,micro_index,micro_time,signatures,tx}]
`GET /transactions/count`  tx_type  id  [pg]  → integer
`GET /transactions/pending`  [pg]  → paged[{block_hash,block_height,encoded_tx,failures,hash,signatures,tx}]
`GET /transactions/pending/count`  → integer
`GET /transactions/{hash}`  → {block_hash,block_height,encoded_tx,hash,micro_index,micro_time,signatures,tx}

## /transfers
`GET /transfers`  [pg]  → paged[{account_id,amount,height,kind,ref_block_hash,ref_tx_hash,ref_tx_type}]

## /status
`GET /status`  → {mdw_async_tasks,mdw_gens_per_minute,mdw_height,mdw_last_migration,mdw_revision,mdw_synced,mdw_syncing,mdw_tx_index,mdw_version,node_height,...}
