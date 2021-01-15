curl -G https://api.github.com/search/repositories \
    --data-urlencode "q=created:>`date --date='60 day ago' '+%Y-%m-%d'`" \
    --data-urlencode "sort=stars" \
    --data-urlencode "order=desc" \
    | jq ".items[] | {name, description, language, watchers_count, html_url}"