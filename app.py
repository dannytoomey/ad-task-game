from flask import Flask, flash, render_template, request, jsonify, Response, redirect, url_for
from flask_cache_buster import CacheBuster

config = {
     'extensions': ['.js', '.css', '.csv'],
     'hash_size': 10
}
cache_buster = CacheBuster(config=config)

app = Flask(__name__, template_folder='./templates', static_folder='./static')
cache_buster.register_cache_buster(app)

from connect import HandleData 

@app.route('/')
def home():
	return render_template('home.html')

@app.route('/game')
def game():
	return render_template('game.html')

@app.route('/test')
def test():
	return	render_template('test.html')

if __name__ == '__main__':
	app.run()