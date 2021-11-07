import { Component, ElementRef, QueryList, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public turn: string = "O"
  public player1 = "X"
  public player2 = "O"
  public colorPlayer1: number = 2
  public colorPlayer2: number = 6
  public color = 2
  public tiles: Array<ElementRef> = []

  public board: Array<string>;
  public colors: Array<number>;
  public gameOver = false

  @ViewChild('tile0') tile0 !: ElementRef
  @ViewChild('tile1') tile1 !: ElementRef
  @ViewChild('tile2') tile2 !: ElementRef
  @ViewChild('tile3') tile3 !: ElementRef
  @ViewChild('tile4') tile4 !: ElementRef
  @ViewChild('tile5') tile5 !: ElementRef
  @ViewChild('tile6') tile6 !: ElementRef
  @ViewChild('tile7') tile7 !: ElementRef
  @ViewChild('tile8') tile8 !: ElementRef

  constructor(){
    this.colors = [0, 1, 2, 3, 4, 5, 6, 7];
    this.board = ["", "", "", "", "", "", "", "", ""]
    this.changeTurn()
  }
  
  ngAfterViewInit(){
    this.tiles = [this.tile0, this.tile1, this.tile2, this.tile3, this.tile4, this.tile5, this.tile6, this.tile7, this.tile8]
    this.setEmptyTilesColor();
  }

  togglePlayer(){
    this.changePlayers()
    if(this.player1 != this.turn){
      this.changeTurn()
    }
    this.reset()
  }

  markPosition(pos: number){
    if(this.board[pos]=="" || !this.gameOver){
      this.board[pos] = this.turn    
      const win = this.checkVictory()
      if(win==""){
        this.changeTurn()
        this.setEmptyTilesColor()
        this.gameOver = this.isTie()
        if(this.gameOver){
          alert("Empate...");
        }        
      }    
      else{
        this.gameOver = true
        setTimeout(() => alert("Ganó el jugador "+this.turn), 200);
      }
    }
  }  

  isTie(): boolean {
    for(let i=0; i<this.board.length; i++){
      if(this.board[i]==""){
        return false;
      }
    }
    return true;
  }

  changeTurn(){
    if(this.turn == "X"){
      this.turn = "O"      
    }
    else{
      this.turn = "X"      
    }
  }

  reset(){
    this.board = ["", "", "", "", "", "", "", "", ""]
    this.setEmptyTilesColor()
    this.turn = this.player1;
  }

  changePlayers(){
    if(this.player1 == "X"){
      this.player1 = "O"
      this.player2 = "X"
    }
    else{
      this.player1 = "X"      
      this.player2 = "O"      
    }
    const aux = this.colorPlayer1;
    this.colorPlayer1 = this.colorPlayer2;
    this.colorPlayer2 = aux;
  }

  setColor(player: number, color: number){
    if(player==1 && this.colorPlayer2!=color){
      this.colorPlayer1 = color
    }
    else if(player==2 && this.colorPlayer1!=color){
      this.colorPlayer2 = color
    }
    this.setEmptyTilesColor()
  }

  setEmptyTilesColor(){
    this.clearClasses()
    this.tiles.forEach((tile, index)=>{
      if(this.board[index]==""){
        const color = this.turn==this.player1?this.colorPlayer1:this.colorPlayer2
        if(this.turn == this.player1){
          tile.nativeElement.classList.remove(`empty-tile-color${this.colorPlayer2}`)
          tile.nativeElement.classList.add(`empty-tile-color${this.colorPlayer1}`, "empty-tile")
        }
        else{
          tile.nativeElement.classList.remove(`empty-tile-color${this.colorPlayer1}`)
          tile.nativeElement.classList.add(`empty-tile-color${this.colorPlayer2}`, "empty-tile")
        }
        tile.nativeElement.innerHTML = this.turn
      }
      else{        
        tile.nativeElement.classList.remove(
          `empty-tile-color${this.colorPlayer1}`,
          `empty-tile-color${this.colorPlayer2}`,
          "empty-tile"
        )
        //tile.nativeElement.classList.remove(`empty-tile-color${this.colorPlayer2}`)
      }
    })
  }

  clearClasses(){
    this.tiles.forEach((tile, index)=>{
      tile.nativeElement.classList.remove(...tile.nativeElement.classList)
      tile.nativeElement.classList.add("tile")      
      if(this.board[index]==""){
        tile.nativeElement.innerHTML= ""
      }
    })
  }

  //Tic Tac Toe Logic
  checkVictory(): string{
    const color = this.turn==this.player1?this.colorPlayer1:this.colorPlayer2

    if(this.board[0]!="" && this.board[0]==this.board[1] && this.board[1]==this.board[2]){
      this.clearClasses()
      this.tiles[0].nativeElement.classList.add(`bg-color${color}`)
      this.tiles[1].nativeElement.classList.add(`bg-color${color}`)
      this.tiles[2].nativeElement.classList.add(`bg-color${color}`)
      return this.board[0]
    }
    else if(this.board[3]!="" && this.board[3]==this.board[4] && this.board[4]==this.board[5]){
      this.clearClasses()
      this.tiles[3].nativeElement.classList.add(`bg-color${color}`)
      this.tiles[4].nativeElement.classList.add(`bg-color${color}`)
      this.tiles[5].nativeElement.classList.add(`bg-color${color}`)
      return this.board[3]
    }
    else if(this.board[6]!="" && this.board[6]==this.board[7] && this.board[7]==this.board[8]){
      this.clearClasses()
      this.tiles[6].nativeElement.classList.add(`bg-color${color}`)
      this.tiles[7].nativeElement.classList.add(`bg-color${color}`)
      this.tiles[8].nativeElement.classList.add(`bg-color${color}`)
      return this.board[6]
    }
    else if(this.board[0]!="" && this.board[0]==this.board[3] && this.board[3]==this.board[6]){
      this.clearClasses()
      this.tiles[0].nativeElement.classList.add(`bg-color${color}`)
      this.tiles[3].nativeElement.classList.add(`bg-color${color}`)
      this.tiles[6].nativeElement.classList.add(`bg-color${color}`)
      return this.board[0]
    }
    else if(this.board[1]!="" && this.board[1]==this.board[4] && this.board[4]==this.board[7]){
      this.clearClasses()
      this.tiles[1].nativeElement.classList.add(`bg-color${color}`)
      this.tiles[4].nativeElement.classList.add(`bg-color${color}`)
      this.tiles[7].nativeElement.classList.add(`bg-color${color}`)
      return this.board[1]
    }
    else if(this.board[2]!="" && this.board[2]==this.board[5] && this.board[5]==this.board[8]){
      this.clearClasses()
      this.tiles[2].nativeElement.classList.add(`bg-color${color}`)
      this.tiles[5].nativeElement.classList.add(`bg-color${color}`)
      this.tiles[8].nativeElement.classList.add(`bg-color${color}`)
      return this.board[2]
    }
    else if(this.board[0]!="" && this.board[0]==this.board[4] && this.board[4]==this.board[8]){
      this.clearClasses()
      this.tiles[0].nativeElement.classList.add(`bg-color${color}`)
      this.tiles[4].nativeElement.classList.add(`bg-color${color}`)
      this.tiles[8].nativeElement.classList.add(`bg-color${color}`)
      return this.board[0]
    }
    else if(this.board[2]!="" && this.board[2]==this.board[4] && this.board[4]==this.board[6]){
      this.clearClasses()
      this.tiles[2].nativeElement.classList.add(`bg-color${color}`)
      this.tiles[4].nativeElement.classList.add(`bg-color${color}`)
      this.tiles[6].nativeElement.classList.add(`bg-color${color}`)
      return this.board[2]
    }  
    return ""  
  }
}
