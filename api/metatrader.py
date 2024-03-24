from logging_config import logger

def deposit_brl_to_broker(account: str,qtd: int):
    logger.info(f'depositing {qtd} brl to {account}')

def withdraw_brl_from_broker(account: str,qtd: int):
    logger.info(f'withdrawing {qtd} brl to {account}')

def buy_stock(account:str ,ticker:str, qtd: int):
    logger.info(f'buying {qtd} of {ticker} in {account}')

def sell_stock(account:str ,ticker:str, qtd: int):
    logger.info(f'selling {qtd} of {ticker} in {account}')