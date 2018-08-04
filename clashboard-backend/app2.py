from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def hello():
    return "Home page"
@app.route("/a")
def tuna():
    return "Tuna is good"
@app.route("/b")
def render_static():
    return render_template("hellohtml.html")
@app.route("/c")
def render_static2():
    return render_template("picture.html")


if __name__ == "__main__":
    app.run()