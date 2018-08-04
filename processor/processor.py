import threading
import os
import ssl
from pymongo import MongoClient

os.environ["TIMERINTERVAL"] = "0"
uri = "mongodb+srv://user:123@unihack-dt2qp.mongodb.net/test?authMechanism=SCRAM-SHA-1"
client = MongoClient(uri, ssl_cert_reqs=ssl.CERT_NONE)
print("here")

mydb = client["UNIHACK"]
mycol = mydb["eye-data"]

myquery = { "test" : "data" }
mydoc = mycol.find(myquery)

for x in mydoc:
    print(x)


def loop():
    # class threading.Timer(interval, function, args=None, kwargs=None)
    threading.Timer(5.0, loop).start()
    print(os.environ["TIMERINTERVAL"])


loop()
