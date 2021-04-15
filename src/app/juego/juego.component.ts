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
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css'],
})
export class JuegoComponent implements OnInit {
  player1: jugador;
  player2: jugador;
  turno: Boolean;
  tablero: Number[];

  tableroImgs: String[] = ['./assets/-.png', './assets/x.png', './assets/o.png'];
  isTableroFull: Boolean;

  constructor(private gameInfo: GameinfoService) {
    this.player1 = gameInfo.getPlayer1();
    this.player2 = gameInfo.getPlayer2();
    this.turno = gameInfo.getTurno();
    this.tablero = gameInfo.getTablero();
  }

  ngOnInit(): void {}

  ngDoCheck() {
    if (this.turno !== this.gameInfo.getTurno()) {
      this.turno = this.gameInfo.getTurno();
    }

    this.isTableroFull = this.gameInfo.CheckTablero();

    if (this.isTableroFull) {
      this.gameInfo.GameOver();
    }

    this.CheckWinningPlayer();
  }

  getIconTablero(position: number): String {
    if (this.tablero[position] === 0) return this.tableroImgs[0];
    if (this.tablero[position] === 1) return this.tableroImgs[1];
    if (this.tablero[position] === 2) return this.tableroImgs[2];

    return null;
  }

  putFicha(position: number): void {
    if (this.tablero[position] === 0) {
      if (!this.turno) {
        this.tablero[position] = 1;
        this.gameInfo.setTablero(this.tablero);
        this.endTurno();
      } else {
        this.tablero[position] = 2;
        this.gameInfo.setTablero(this.tablero);
        this.endTurno();
      }
    } else {
      window.alert('Esa casilla está ocupada >:(');
    }
  }

  endTurno(): void {
    this.gameInfo.TurnoChanger();
  }



  CheckWinningPlayer(): void {
    this.gameInfo.WinAlready();
  }
}
