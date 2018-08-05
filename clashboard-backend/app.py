from pymongo import MongoClient
from flask import request, jsonify,Flask, send_from_directory,render_template
from bson.json_util import dumps
from flask_cors import CORS
from selenium import webdriver
import ssl
import json
from selenium.webdriver.chrome.options import Options

uri = "mongodb+srv://user:123@unihack-dt2qp.mongodb.net/test?authMechanism=SCRAM-SHA-1"
client = MongoClient(uri, ssl_cert_reqs=ssl.CERT_NONE)


options = Options()
# options.add_argument('--headless')
# options.add_argument('--disable-gpu')
driver_path = '/Users/vince/UNIHACK/chromedriver'


app = Flask(__name__)
mydb = client["UNIHACK"]
mycol = mydb["eye-data"]
CORS(app)

@app.route("/")
def dashboard():
    website_str = request.args.get('site')
    driver = webdriver.Chrome(driver_path,chrome_options=options)
    driver.get(website_str)
    screenshot = driver.save_screenshot("static/"+ "webScreenshot"+'.png')
    driver.quit()
    return render_template("index.html")


@app.route('/getData', methods=['GET'])
def getFromMongo():
    str = request.args.get('website')
    mydb = client["UNIHACK"]
    mycol = mydb["eye-data"]
    if request.method == 'GET':
        print(str)
        myquery = {"website": str}
        mydoc = mycol.find_one(myquery)
        return dumps(mydoc)

@app.route('/getPoints', methods=['GET'])
def calculatePoints():
    str= request.args.get('w')



@app.route("/postData", methods=["POST"])
def insertToMongo():
    json_data = request.get_data()
    d_list = json.loads(json_data)
    insert = {
        "website": d_list['url'],
        "data": d_list['data'],
    }
    mycol.insert_one(insert)
    return "OK"

if __name__ == '__main__':
    app.run()