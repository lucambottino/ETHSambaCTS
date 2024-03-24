from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
from logging_config import logger
import binance
import metatrader


class Buy(BaseModel):
    account: str
    ticker: str
    qty: int


OUR_BINANCE_ACCOUNT = 'ACCOUNT ADDR'
OUR_METATRADER_ACCOUNT = 'ACCOUNT ADDR'
TICKER = 'PETR4'

app = FastAPI()


@app.get("/")
def read_root():
    logger.info("hello log")
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.post("/buy")
def buy(buy:Buy):

    # post deposit eth from customer account to binance account
    binance.transfer_eth(buy.account,OUR_BINANCE_ACCOUNT,buy.qtd)
    # convert eth brl
    brl_total = binance.sell_eth(OUR_BINANCE_ACCOUNT,buy.qtd)
    # deposit brl to broker
    metatrader.deposit_brl_to_broker(OUR_METATRADER_ACCOUNT,brl_total)
    # post metatrader buy ticker x qtd
    ticker_price = 1
    metatrader.buy_stock(OUR_METATRADER_ACCOUNT,TICKER,brl_total/ticker_price)



    return buy

@app.post("/sell")
def buy(buy:Buy):

    # post metatrader sell ticker x qtd
    # withdraw brl from broker
    # post deposit brl to binance
    # convert brl eth
    # transfer eth to user


    return buy