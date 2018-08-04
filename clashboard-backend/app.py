from pymongo import MongoClient
from flask import request, jsonify
from flask import Flask
from bson.json_util import dumps

import ssl

uri = "mongodb+srv://user:123@unihack-dt2qp.mongodb.net/test?authMechanism=SCRAM-SHA-1"
client = MongoClient(uri, ssl_cert_reqs=ssl.CERT_NONE)

app = Flask(__name__)


@app.route('/getData', methods=['GET', 'POST'])
def user():
    mydb = client["UNIHACK"]
    mycol = mydb["eye-data"]
    if request.method == 'GET':
        myquery = {"website": "www.firsttest.com"}
        mydoc = mycol.find_one(myquery)
        return dumps(mydoc)

        # if data.get('name', None) is not None and data.get('email', None) is not None:
        #     pymongo.db.users.insert_one(data)
        #     return jsonify({'ok': True, 'message': 'User created successfully!'}), 200
        # else:
        #     return jsonify({'ok': False, 'message': 'Bad request parameters!'}), 400


if __name__ == '__main__':
    app.run()