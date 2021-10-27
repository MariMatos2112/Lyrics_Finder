from flask import Flask, render_template, redirect, url_for, request
from main import search_song

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        user_input = request.form.get('user_song')
        return redirect(url_for('music_found', user_input=user_input))

    return render_template('index.html')

@app.route('/music-found')
def music_found():
    user_input = request.args.get('user_input')
    song_data = search_song(user_input)
    return render_template('music-found.html', song_data=song_data)

if __name__ == '__main__':
    app.run(debug=True)