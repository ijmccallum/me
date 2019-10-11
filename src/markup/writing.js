var writings = require("./writing.json");

module.exports = function() {
  let writingsMarkup = "";
  writings.articles.forEach(function(write) {
    writingsMarkup += html`
            <article>
                <header>
                    <h3><a href="${write.url}">${write.title}</a></h3>
                </header>
                <p>${write.description}</p>
            </article>
        `;
  });

  return html`
        <div class="margin-bottom grid">
            <div>
                <h2>Writing</h2>
                <p>One of the best way to learn, for me, is to grok the docs of a project and summarize it in a blog post.</p>
            </div>
        </div>
        <div class="grid">
            ${writingsMarkup}
        </div>
    `;
};
