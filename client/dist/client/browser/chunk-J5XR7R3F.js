import{La as o,b as s}from"./chunk-SWTC7RC3.js";import{S as e,X as i}from"./chunk-WGZRAWDY.js";var h=(()=>{class t{constructor(r){this.http=r,this.baseUrl=`${o.apiUrl}/cards`}getAllArchetypes(){return this.http.get(`${this.baseUrl}/archetypes`)}bulkGetCards(r){return this.http.post(`${this.baseUrl}/bulk-get`,{cardIDs:r})}static{this.\u0275fac=function(a){return new(a||t)(i(s))}}static{this.\u0275prov=e({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();export{h as a};
