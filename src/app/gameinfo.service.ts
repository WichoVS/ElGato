import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { inherits } from 'util';

@Injectable({
  providedIn: 'root',
})
export class GameinfoService {
  gameOver: boolean = false;
  player1: jugador;
  player2: jugador;
  turno: Boolean = false;
  tablero: Number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  constructor() {
    this.player1 = new jugador('Wicho', 'Esperando');
    this.player2 = new jugador('Yisus', 'Esperando');
  }

  getPlayer1(): jugador {
    return this.player1;
  }

  getPlayer2(): jugador {
    return this.player2;
  }

  getTablero(): Number[] {
    return this.tablero;
  }

  GameOver(): void {
    this.gameOver = true;
  }

  checkGameOver(): Boolean {
    return this.gameOver;
  }

  TurnoChanger(): void {
    this.turno = !this.turno;
    this.TurnoManager();
  }

  public getTurno(): Boolean {
    return this.turno;
  }

  setTablero(tableroGame: Number[]) {
    this.tablero = tableroGame;
  }

  setPlayer1(status: String): void {
    this.player1.estado = status;
  }
  setPlayer2(status: String): void {
    this.player2.estado = status;
  }

  TurnoManager(): void {
    if (!this.turno && !this.gameOver) {
      this.player1.estado = 'Tu Turno';
      this.player2.estado = 'Esperando';
    } else if (this.turno && !this.gameOver) {
      this.player1.estado = 'Esperando';
      this.player2.estado = 'Tu Turno';
    }
  }

  CheckTablero(): Boolean {
    for (let i = 0; i < 9; i++) {
      if (this.tablero[i] == 0) return false;
    }
    return true;
  }

  WinAlready(): void {
    if (
      this.VictoriaHorizontal() == 1 ||
      this.VictoriaDiagonal() == 1 ||
      this.VictoriaVertical() == 1
    ) {
      this.setPlayer1('Ganador');
      this.setPlayer2('Perdedor');
      window.alert('Victoria de ' + this.player1.name + ' AYAYA');
      this.GameOver();
    } else if (
      this.VictoriaHorizontal() == 2 ||
      this.VictoriaDiagonal() == 2 ||
      this.VictoriaVertical() == 2
    ) {
      this.setPlayer1('Perdedor');
      this.setPlayer2('Ganador');
      window.alert('Victoria de ' + this.player2.name + ' AYAYA');
      this.GameOver();
    }
    else if(this.CheckTablero())
    {
      this.setPlayer1('Empatado');
      this.setPlayer2('Empatado');
      window.alert('EMPATEEEEE!');
      this.GameOver();
    }
  }

  VictoriaHorizontal(): Number {
    if (
      (this.tablero[0] == 1 && this.tablero[1] == 1 && this.tablero[2] == 1) ||
      (this.tablero[3] == 1 && this.tablero[4] == 1 && this.tablero[5] == 1) ||
      (this.tablero[6] == 1 && this.tablero[7] == 1 && this.tablero[8] == 1)
    ) {
      return 1;
    } else if (
      (this.tablero[0] == 2 && this.tablero[1] == 2 && this.tablero[2] == 2) ||
      (this.tablero[3] == 2 && this.tablero[4] == 2 && this.tablero[5] == 2) ||
      (this.tablero[6] == 2 && this.tablero[7] == 2 && this.tablero[8] == 2)
    ) {
      return 2;
    }

    return 0;
  }

  VictoriaDiagonal(): Number {
    if (
      (this.tablero[0] == 1 && this.tablero[4] == 1 && this.tablero[8] == 1) ||
      (this.tablero[2] == 1 && this.tablero[4] == 1 && this.tablero[6] == 1)
    ) {
      return 1;
    } else if (
      (this.tablero[0] == 2 && this.tablero[4] == 2 && this.tablero[8] == 2) ||
      (this.tablero[2] == 2 && this.tablero[4] == 2 && this.tablero[6] == 2)
    ) {
      return 2;
    }

    return 0;
  }

  VictoriaVertical(): Number {
    if (
      (this.tablero[0] == 1 && this.tablero[3] == 1 && this.tablero[6] == 1) ||
      (this.tablero[1] == 1 && this.tablero[4] == 1 && this.tablero[7] == 1) ||
      (this.tablero[2] == 1 && this.tablero[5] == 1 && this.tablero[8] == 1)
    ) {
      return 1;
    } else if (
      (this.tablero[0] == 2 && this.tablero[3] == 2 && this.tablero[6] == 2) ||
      (this.tablero[1] == 2 && this.tablero[4] == 2 && this.tablero[7] == 2) ||
      (this.tablero[2] == 2 && this.tablero[5] == 2 && this.tablero[8] == 2)
    ) {
      return 2;
    }

    return 0;
  }

  ResetTablero():void{
    this.gameOver = false;
    this.turno=false;
    this.tablero = [0,0,0,0,0,0,0,0,0];
  }

}

class jugador {
  name: String;
  turno: String;
  estado: String;

  constructor(name: string, estado: string) {
    this.name = name;
    this.estado = estado;
  }
}
