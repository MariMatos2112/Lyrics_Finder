from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/music-found')
def music_found():
    return render_template('search-completed.html')

if __name__ == '__main__':
    app.run(debug=True)