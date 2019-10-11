var projects = [
  {
    title: "WikiLogic",
    url: "http://www.wikilogicfoundation.org/",
    description:
      "An open source project that graphs arguments and their premises. React on the front end calls a node API backed by a graph database (ArangoJS) and fronted by an nginx proxy. All of it running in Docker."
  },
  {
    title: "Mini Site Generator",
    url: "https://www.npmjs.com/package/mini-site-generator",
    description:
      "A very simple JavaScript template string literal based static site generator. I wanted a simple solution without the complexity, quirks, and expectations that I've found in other generators. This site is built with it!"
  },
  {
    title: "MSG-Starter",
    url: "https://github.com/ijmccallum/msg-starter",
    description:
      "A front end boilerplate / CSS starter kit / collection of useful tricks. As I work on and learn new things I'm collecting the best bits into this little starter kit in order to give future projects a familiar kick start. ('MSG' because it's using the Mini Site Generator!)"
  },
  {
    title: "30 Days of MDN",
    url: "https://github.com/ijmccallum/30-days-of",
    description:
      "A self imposed learning challenge to get to know more of the available Web APIs. "
  }
];

module.exports = function() {
  let projectsMarkup = "";
  projects.forEach(function(project) {
    projectsMarkup += html`
            <article>
                <header>
                    <h3><a href="${project.url}">${project.title}</a></h3>
                </header>
                <p>${project.description}</p>
            </article>
        `;
  });

  return html`
        <div class="margin-bottom grid">
            <div>
                <h2>Personal Projects</h2>
                <p>A mix of code & notes of learning, I keep them all in github where you'll find a lot more. These are the more polished ones.</p>
            </div>
        </div>
        <div class="grid">
            ${projectsMarkup}
        </div>
    `;
};
