import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss']
})
export class HangmanComponent implements OnInit {
  puan:number=0;
  hataSayisi:number=0;
  oyunBitti:boolean=false;
  sorular:string[]=["aydın","izmir","antalya","istanbul","ankara","mardin","adana","çanakkale"];
  soru:string[]=[];
  harfler:string[]=["q","w","e","r","t","y","u","ı","o","p","ğ","ü","a","s","d","f","g","h","j","k","l","ş","i","z","x","c","v","b","n","m","ö","ç"];
  dogruIndexler: number[]=[];
  constructor() { }

  ngOnInit(): void {
    this.soruDegistir();
  }
  hataArttir():void{
    if(this.hataSayisi<6){
      this.hataSayisi += 1;
    }
    if(this.hataSayisi==6){
      console.log("oyun bitti");
      this.oyunBitti=true;
    }
  }
  soruYazdir():void{
    console.log(this.soru);
  }
  soruDegistir(){
    let rastgeleNumara=Math.floor(Math.random() * this.sorular.length);
   this.soru=[...this.sorular[rastgeleNumara]];
   this.sorular.splice(rastgeleNumara,1);
  }
  klavyeTiki(secilenHarf:string,elementId:number){
    let tiklanilanHarf= document.getElementById(elementId.toString())
    if (tiklanilanHarf != null) {
      tiklanilanHarf.setAttribute('disabled', '');
    }
    if(this.soru.includes(secilenHarf)){
      for (let index = 0; index < this.soru.length; index++) {
        if (this.soru[index] === secilenHarf) {
          this.dogruIndexler.push(index);
        }
        this.dogruIndexler.forEach((e)=>{
          let donguElamani= document.getElementById("harf"+e);
          if (donguElamani != null) {
            donguElamani.style.display="block";
          }
        })
      }
      return;
    }
    this.hataArttir();
  }

  yenidenBaslat(){
    this.oyunBitti=false;
    this.yeniBolum();
    this.puan=0;

  }

  yeniBolum(){
    this.puan+=100;
    this.harfler.forEach((e)=>{
      let index = this.harfler.indexOf(e)
      let tiklanmisHarf= document.getElementById(index.toString())
      if (tiklanmisHarf != null) {
        tiklanmisHarf.removeAttribute("disabled")
      }
    })
    this.dogruIndexler=[];
    this.hataSayisi=0;
    let tumIndexler:number[]=[];
    for (let index = 0; index < this.soru.length; index++) {
      tumIndexler.push(index);
    }
    tumIndexler.forEach((e)=>{
      let donguElamani= document.getElementById("harf"+e);
      if (donguElamani != null) {
        donguElamani.style.display="none";
      }
    })

    this.soruDegistir();
  }




}
