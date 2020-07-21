export class Api {
  constructor(options) {
    this._options = options;
  }

  getInitialCards() {
    let data;
    fetch(`${this._options.baseUrl}/cards`, {
      headers:this._options.headers      
    })
    .then(res => res.json())
    .then((result) => {
      data = result
      console.log(result);
    })
    .then((data) => {
      console.log(data);
    });
      
    
  }

  // другие методы работы с API
}