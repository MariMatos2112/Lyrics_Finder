import requests
from bs4 import BeautifulSoup, BeautifulStoneSoup

def search_song(user_input):
    links = {
        'genius': '',
        'vagalume': '',
        'letras': '',
        'az': ''
    }
    google_pages = []
    song_info = {
        'img': '',
        'song': '',
        'artist': '',
        'description': '',
    }

    def find_links(data):
        if data['link'][:data['final_link_index']] == data['search_link']:
            string_beggining = data['link'].find('//')
            string_end = data['link'].find(data['end_string'])
            links[data['link_links']] = data['link'][string_beggining + 2:string_end + data['string_end_plus_index']]

    if 'lyrics' not in user_input: user_input = user_input + ' lyrics'

    for key in links.keys():
        user_input = f'{user_input} {key}'
        
        google_response = requests.get(f'https://google.com/search?q={user_input}')
        google_content = BeautifulSoup(google_response.content, 'html.parser')
        google_pages.append(google_content)

        user_input = user_input.replace(key, '')

    for page in google_pages:
        google_links = page.findAll('a')

        for link in google_links:
            link = str(link)

            if page == google_pages[0]:
                if links['genius'] == '': find_links({'link': link, 'final_link_index': 35, 'search_link': '<a href="/url?q=https://genius.com/', 'end_string': '&', 'link_links': 'genius', 'string_end_plus_index': 0})

            if page == google_pages[1]:
                if links['vagalume'] == '': find_links({'link': link, 'final_link_index': 44, 'search_link': '<a href="/url?q=https://www.vagalume.com.br/', 'end_string': 'html', 'link_links': 'vagalume', 'string_end_plus_index': 4})

            if page == google_pages[2]:
                if links['letras'] == '': find_links({'link': link, 'final_link_index': 42, 'search_link': '<a href="/url?q=https://www.letras.mus.br/', 'end_string': 'html', 'link_links': 'letras', 'string_end_plus_index': 4})

            if page == google_pages[3]:
                if links['az'] == '': find_links({'link': link, 'final_link_index': 41, 'search_link': '<a href="/url?q=https://www.azlyrics.com/', 'end_string': 'html', 'link_links': 'az', 'string_end_plus_index': 4})

    main_response = requests.get(f'http://{links["genius"]}')
    main_content = BeautifulSoup(main_response.content, 'html.parser')

    song_info['img'] = main_content.find('meta', property='og:image')['content']
    title = main_content.find('meta', property='og:title')['content']
    middle_index = title.find('–')
    song_info['song'] = title[middle_index + 2:]
    song_info['artist'] = title[:middle_index - 1].replace('\xa0', ' ')
    unformatted_description = main_content.find('meta', property='og:description')['content'].replace('\n\n', ' ')
    if unformatted_description.endswith('.') or unformatted_description.endswith('!') or unformatted_description.endswith('...') or unformatted_description.endswith('?'): song_info['description'] = unformatted_description
    else: song_info['description'] = f'{unformatted_description}...'

    return [song_info, links]