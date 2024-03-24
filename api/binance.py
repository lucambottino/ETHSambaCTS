from logging_config import logger

def deposit_brl(account: str,qtd: int):
    logger.info(f'depositing {qtd} brl to {account}')

def withdraw_brl(account: str,qtd: int):
    logger.info(f'withdrawing {qtd} brl to {account}')

def buy_eth(account:str , qtd: int):
    logger.info(f'buying {qtd} ETH in {account}')

def sell_eth(account:str, qtd: int):
    logger.info(f'selling {qtd} ETH in {account}')

def transfer_eth(account_src: str, account_dest: str, qtd: str):
    logger.info(f'tranfering {qtd} eth from {account_src} to {account_dest}')