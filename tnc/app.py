from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import requests
from bs4 import BeautifulSoup
import html2text
from one import potential_keyword, Summarize


app = Flask(__name__)
CORS(app)

API_URL = '/news'

@app.route('/news', methods=['POST'])
def sentiment_analyzer():
    news_text = request.form.get("url")
    print(news_text)
    summary = ["prime minister modi", "donald trump", "valdimir putin"]
    fraud = True
    point = ["Compensation", "provision"]
    r = requests.get(news_text)

    h = html2text.HTML2Text()
    h.ignore_links = True
    f = open("BOB.txt", "w")
    f.write((h.handle(r.text)).replace("*",""))
    f.close()
    summary = Summarize("BOB.txt", 3).generate_summary().split(".")
    pop1 = potential_keyword('BOB.txt').nega()
    f = open("ned.txt", "w")
    f.write(str(pop1))
    f.close()
    point = Summarize("ned.txt", 2).generate_summary().split(".")
    resp = json.dumps({"summary": summary, "fraud": fraud, "point": point})
    return resp



if __name__ == '__main__':
    app.run(debug=False)
