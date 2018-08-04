from pymongo import MongoClient
from flask import request, jsonify
from flask import Flask
from bson.json_util import dumps
import ssl
import json
from pprint import pprint


uri = "mongodb+srv://user:123@unihack-dt2qp.mongodb.net/test?authMechanism=SCRAM-SHA-1"
client = MongoClient(uri, ssl_cert_reqs=ssl.CERT_NONE)

app = Flask(__name__)
mydb = client["UNIHACK"]
mycol = mydb["eye-data"]


@app.route('/getData', methods=['GET'])
def getFromMongo():

    if request.method == 'GET':
        myquery = {"website": "www.firsttest.com"}
        mydoc = mycol.find_one(myquery)
        return dumps(mydoc)


@app.route("/postData", methods=["POST"])
def insertToMongo():
    json_data = request.get_data()
    d_list = json.loads(json_data)

    insert = {
        "website": d_list['website'],
        "data": d_list['data'],
    }
    print(insert)

    mycol.insert_one(insert)

    print("recieved post")
    return "OK"


if __name__ == '__main__':
    app.run()