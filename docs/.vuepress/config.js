module.exports = {
  title: 'I\'M IM. scratchpad scrapbook notebook braindump pigeonhole infolist jotter thoughtream briefcase wordbasket',
  description: 'Just playing around',
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAFF0lEQVR42mVVXW8TRxQdm9/AT0CoDyjYFAiEBJKQD4KEUNMfALKEIpr+gEgGgYBA+0AA0TxA4vSpCAECBPEDCqASIfFSIZDIgxEFQoiTxpQUAvbuzJ3Tcze7LinHPpqRPXPOvXfvzBoFvP+CkgJgyFXe24z3khfx4+KkZG34AYCyVKvVxmtBLe/hM7qWNOJ9SkRMwggutMbZiCmBpD1gyHUUHnPOVZwInHX09lDMzs5iYmIC9+/fw/zcnP5e4boxjusAb2iYdk5STrxxamLDwIizqd/fzWsGaS7MkbMkrLWeFMXHjx/9L8PD2Lt3L4aHh325XJZqtSpe9CsQ7nFecqghPYlPxjqXChm4CQJvACjVfYBjoOKkIyQIAhAqitWrV0ejQkUVuoZBOEL3cK8MJHpaJp2kI3Fnc5S1IDwRZ4DE4OnTp+js7MS+ffuwsLCQiCvVTEfPL+feOnE5QIxnyQ0D0Fo1ML0yliEqrpvUIDYES4InT56gv78fe/bsqZvoOqX3Sgip8zJ1G0hjpsxfxnlfsFxAWMRIIlPhoaEhjI6OIgxD3Lx5Ez09PZifn08M6kEASlide5HC0TSMoU6WThVmphHop26guH79OjKZDKanp6MOKhQKePPmzX9rvoaPDSvWuqwRQT5y9E50TAy0PJ8/f9aoo+gPHjyImZmZSJRnAEtLS/XIv0a9zHnDSZFz3ciWrD8wNain//r1a4yMjIBtiQTJOhWKxVZmQU0rUjScP4+D8CqqmzRqxdu3b/HgwQNcuXIFxWIRt27dwp07dzA5OanlUmE11WB0z5fZqK2m8dzo0Y//WCF+9+5dnDhxApcvX8bt27cj3rhxI3rIly5dwvHjx/Hw4cMkG923IovY4INmoAYrSqMYGBiI+OzZMy2RdpN2DrOaidr12LFj2L9/Py5cuKBZJtHrGBPLBpw8F/EgvZroXHHo0CGsXfsNmpu3o7W1jYesC11d3Whra8fWrduwaVMjduxoRXv7TmSzG2h0sV4FT1AOVqyWyBfjDHzirjh8+DC+/XYTBTvQ1NSCbduaOTZzbKFhOzZubGQQRygoOH16iIabUSqVkg70zjsauKIRcfnYQP5vkMlsQEdHF6PsWMGdOzv1Px7As1C8fPkKW7Y04erVqyD0ehHtSErljXVBltoVkeQOSkoUGaggS9GmUSt1zqy0LBtx6tTPULx48SfL1oRr166B8HpO9PBSKmt+O2MMDQqsGiyRdEI+n48NOrXWKqysG6xfn8XZs+egGBv7lSXbjKmpKRA2DC0cNd0BGENJoxeTiC1rq6kHiCNHjqpIkoGynkFLy46oJAcO9LGVB9HQkMHJkz+BkOU7zJetBA2kRq8vGXB0OUuoCeHZopoBu6f7C/FWjT56Bm2t7TTaju7uHpw/P8y6h9o7WhrrQsnZQIwNXNoEQbX+wqH4QECAGBwcdGvWrJXGxq0arbZr1EVN7CJtUW3hM2fOwertT2hpOQu8W37hCGltTW/TkNHb1KNHizRxaedsDsBsZaGCixdHfV9fn/T29squnh6/e9du9H73Pfp/+NGPjhRkcXFRNFtGz8K7Wbrklv75Ow1EFUkxI6Pixnu3/IPzaWFq5Dp4jAGo1GpVzM2VeZpfYZoneq48hzhJrbUKV7zIGCz3ODGghg1tijRhEBqFite59GkpNXHvnvnj8eNV796/zzjv8wDGyRL5QSkipWotGA9D4RlCJpTaKkHVOAZJmoSKfwHmDEZaVNa/DQAAAABJRU5ErkJggg==" }],
    ['title', '←? Iain J McCallum']
  ],
  themeConfig: {
    sidebarDepth: 0,
    sidebar: [
      '/',
      ['/code-bucket-list', 'Code bucket list'],
      ['/devtainment', 'Devtainment'],
      ['/ProjectIdeas', 'Project Ideas'],
      {
        title: 'Tech Notes',
        collapsable: false,
        children: [
          ['/techNotes/WordPress', 'WordPress'],
          ['/techNotes/arangojs', 'ArangoJS'],
          ['/techNotes/BeyondCorp', 'BeyondCorp'],
          ['/techNotes/css', 'CSS'],
          ['/techNotes/docker', 'Docker'],
          ['/techNotes/NodeChromeTracing', 'Node Chrome Tracing'],
          ['/techNotes/react', 'React'],
          ['/techNotes/app-starter', 'App Starter']
        ]
      },
      {
        title: 'Book Notes',
        collapsable: false,
        children: [
          ['/bookNotes/20TeamPatterns', '20 Team Patterns'],
          ['/bookNotes/GoogleSREBook', 'Google SRE Book'],
          {
            title: 'The Architecture of Open Source Applications, Vol 1',
            collapsable: false,
            children: [
              ['/bookNotes/TAOSA/Vol1/1%20asterisk', 'Ch 1: Asterisk'],
              ['/bookNotes/TAOSA/Vol1/2%20audacity', 'Ch 2: Audacity'],
              ['/bookNotes/TAOSA/Vol1/3%20Bash', 'Ch 3: Bash'],
              ['/bookNotes/TAOSA/Vol1/4%20Berkly%20DB', 'Ch 4: Berkly DB'],
              ['/bookNotes/TAOSA/Vol1/5%20CMake', 'Ch 5: CMake'],
              ['/bookNotes/TAOSA/Vol1/6%20Eclipse', 'Ch 6: Eclipse'],
              ['/bookNotes/TAOSA/Vol1/7%20Graphite', 'Ch 7: Graphite'],
              ['/bookNotes/TAOSA/Vol1/8%20Hadoop', 'Ch 8: Hadoop'],
              ['/bookNotes/TAOSA/Vol1/9%20CI', 'Ch 9: CI']
            ]
          },
          {
            title: 'The Architecture of Open Source Applications, Vol 2',
            collapsable: false,
            children: [
              ['/bookNotes/TAOSA/Vol2/1%20Scaleable%20web%20arch', 'Ch 1: Scaleable Web Architecture'],
              ['/bookNotes/TAOSA/Vol2/2%20Firefox%20release%20engineering', 'Ch 2: Firefox release engineering'],
              ['/bookNotes/TAOSA/Vol2/6%20Git', 'Ch 6: Git']
            ]
          },
          {
            title: 'The Architecture of Open Source Applications, 500 lines',
            collapsable: false,
            children: [
              ['/bookNotes/TAOSA/500lines/10%20an-archaeology-inspired-database', 'Ch 10: An archaeology inspired DB']
            ]
          }
        ]
      },
      {
        title: 'Articles',
        collapsable: false,
        children: [
          ['/articles/', 'Article list'],
          ['/articles/dockerizing-wikilogic', 'Dockerizing Wikilogic']
        ]
      },
    ]
  }
}