import { Component, OnInit } from '@angular/core';
import { GameinfoService } from 'src/app/gameinfo.service';

class jugador {
  name: String;
  turno: String;
  estado: String;

  constructor(name: string, estado: string) {
    this.name = name;
    this.estado = estado;
  }
}

@Component({
  selector: 'app-gameinfo',
  templateUrl: './gameinfo.component.html',
  styleUrls: ['./gameinfo.component.css'],
})
export class GameinfoComponent implements OnInit {
  player1: jugador;
  player2: jugador;
  turno: Boolean;
  isGameOver: Boolean;

  constructor(private gameInfo: GameinfoService) {
    this.player1 = gameInfo.getPlayer1();
    this.player2 = gameInfo.getPlayer2();
    this.turno = gameInfo.getTurno();
    this.isGameOver = gameInfo.checkGameOver();
    if(!this.turno)
    {
      this.gameInfo.setPlayer1('Tu Turno');
      this.gameInfo.setPlayer2('Esperando');
    }

  }

  ngDoCheck() {
    if (this.turno !== this.gameInfo.getTurno()) {
      this.turno = this.gameInfo.getTurno();
    }

    if (this.player1 !== this.gameInfo.getPlayer1() && !this.gameInfo.checkGameOver()) {

      this.player1 = this.gameInfo.getPlayer1();

    }

    if (this.player2 !== this.gameInfo.getPlayer2()) {
      this.player2 = this.gameInfo.getPlayer2();
    }

    if (this.isGameOver !== this.gameInfo.checkGameOver()) {
      this.isGameOver = this.gameInfo.checkGameOver();
    }

  }

  Reset():void{
    this.gameInfo.ResetTablero();
  }

  ngOnInit(): void {}
}
