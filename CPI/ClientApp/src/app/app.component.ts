import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  constructor(private activeRoute: Router) {

  }

  ngOnInit() {
    this.activeRoute.events.subscribe(this.onUrlChange.bind(this))
  }

  onUrlChange(ev) {
    /*var newEl = document.createElement("li");*/
    if ('content' in document.createElement('template')) {

      var template = document.getElementById('linkRow') as HTMLTemplateElement;
      var linkStr = [{ route: "['/authorize']", link: 'Выйти' }
        //  { route: "/authorize", link: 'Войти/Зарегистрироваться' }
      ];
      for (var i = 0; i < linkStr.length; i++) {
        var mohs = linkStr[i];
        var clone = template.content.cloneNode(true) as HTMLLIElement;
        //console.log(clone);
        var cells = clone.querySelectorAll('a');
        cells[0].textContent = mohs.link;

        //cells[0].setAttribute("routerLink", mohs.route);
        
        //document.getElementById("menu").appendChild(clone);
      }
    }

      if (ev instanceof NavigationEnd) {
        let url = ev.url;
        if (url.indexOf('authorize') != -1 || url.indexOf('register') != -1 || url == "/") {

        }

        else {
          //if (document.getElementById("exitLink") == null)
          //  newEl.setAttribute("class", "nav-item");
          //newEl.setAttribute("id", "exitLink");

          

          //document.getElementById("menu").appendChild(newEl);
        }

        console.log(url);
      }
    }
  }
