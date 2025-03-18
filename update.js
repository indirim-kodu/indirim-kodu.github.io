const fs = require('fs');
const fetch = require('node-fetch');
const xml2js = require('xml2js');

fetch('https://kuponca.com/feed.xml')
  .then(res => res.text())
  .then(xml => {
    xml2js.parseString(xml, (err, result) => {
      if (err) throw err;
      const items = result.rss.channel[0].item;
      let html = `
<!DOCTYPE html>
<html>
<head>
  <title>İndirimde Olan Markalar</title>
  <style>
    .marka-container { display: flex; flex-wrap: wrap; gap: 10px; padding: 20px; }
    .marka-kutu { width: 150px; height: 100px; background-color: #f0f0f0; border: 1px solid #ddd; 
                  display: flex; align-items: center; justify-content: center; text-align: center; 
                  text-decoration: none; color: #333; font-family: Arial, sans-serif; }
    .marka-kutu:hover { background-color: #e0e0e0; }
  </style>
</head>
<body>
  <div class="marka-container">\n`;
      items.forEach(item => {
        html += `    <a href="${item.link[0]}" class="marka-kutu">${item.title[0]}</a>\n`;
      });
      html += `  </div>\n</body>\n</html>`;
      fs.writeFileSync('index.html', html);
    });
  })
  .catch(err => console.error('Hata:', err));
