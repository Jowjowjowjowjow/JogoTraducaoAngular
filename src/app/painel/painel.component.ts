import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { FRASES } from './frases-mock';
import { Frase } from '../shared/frase.model';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

  public frases: Frase[] = FRASES;
  public instrucao: String = 'Traduza a frase!';
  public resposta: String = '';
  public rodada: number = 0;
  public rodadaFrase: Frase;
  public progresso: number = 0;
  public tentativas: number = 3;
  @Output() public encerrarJogo: EventEmitter<String> = new EventEmitter()

  constructor() {
    this.atualizaRodada();
   }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value;

  }

  public verificarResposta(): void {
    if (this.rodadaFrase.frasePtBr === this.resposta) {
      alert('A tradução está correta!');
      // trocar pergunta da todada
      this.rodada++;
      // progresso
      this.progresso = this.progresso + (100 / this.frases.length);
      //
      if (this.rodada === 4) {
        alert('Concluiu as traduções com sucesso!');
        this.encerrarJogo.emit('vitoria');
      }
      // altera pergunta caso correto;
      this.atualizaRodada();
    }else {
      alert('A tradução está incorreta!');
      this.tentativas--;
      if (this.tentativas === -1) {
        alert('Você perdeu todas as tentativas');
        this.encerrarJogo.emit('derrota');
      }
    }
  }

  public atualizaRodada(): void {
    this.rodadaFrase = this.frases[this.rodada];
    // limpar a resposta
    this.resposta = '';
  }

}
