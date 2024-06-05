# -*- coding: utf-8 -*-

from flask import Flask, render_template, jsonify, request
from docx import Document
import json
from lxml import etree

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/topological_relations')
def topological_relations():
    return render_template('topological_relations.html')

@app.route('/sample')
def sample():
    return render_template('sample.html')

@app.route('/chapters')
def chapters():
    return render_template('chapters.html')

@app.route('/chapters/<language>')
def language(language):
    with open(f'jsons/{language}.json', encoding='utf8') as f:
        data = json.load(f)
    with open(f'texts/{language}.html', encoding='utf8') as f:
        text = f.read()
    return render_template(f'language.html',
                           examples=data['data'],
                           language=data['language'],
                           citation=data['citation'],
                           text=text)

if __name__ == '__main__':
    app.run(debug=True)
