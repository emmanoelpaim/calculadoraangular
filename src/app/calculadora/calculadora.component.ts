import { CalculadoraService } from './services/calculadora.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

  private numero2: string;
  private numero1: string;
  private resultado: number;
  private operacao: string;

  constructor( private calculadoraService: CalculadoraService ) { }

  ngOnInit(): void {
    this.limpar();
  }

  /**
   * Limpa o display
   */
  limpar(): void{
    this.numero1 = '0';
    this.numero2 = null;
    this.resultado = null;
    this.operacao = null;
  }

  /**
   * Adiciona um numero no display
   * @param numero numero a ser mostrado no display
   */
  adicionarNumero(numero: string):void{
    if(this.operacao === null){
      this.numero1 = this.concatenarNumero(this.numero1,numero);
    }else{
      this.numero2 = this.concatenarNumero(this.numero2,numero);
    }
  }


  /**
   * Metodo que concatena os botoes selecionados
   * @param numAtual numero atual
   * @param numConcat numero a ser concatenado
   */
  concatenarNumero(numAtual: string, numConcat: string):string{
    if(numAtual === '0' || numAtual === null){
      numAtual = '';
    }

    if(numConcat === '.' && numAtual === ''){
      return '0.';
    }

    if(numConcat === '.' && numAtual.indexOf('.') > -1){
      return numAtual;
    }

    return numAtual + numConcat;
  }

  /**
   * Metodo que define a operação a ser passada no calculo, 
   * caso exista o numero 2 é realizado o calculo.
   * @param operacao parametro passado para verificar qual operacao matematica é utilizada
   */
  defineOperacao(operacao: string): void{
    if(this.operacao === null){
      this.operacao = operacao;
      return;
    }

    if(this.numero2 !== null){
      this.resultado = this.calculadoraService.calcular(parseFloat(this.numero1),parseFloat(this.numero2),this.operacao);
      this.operacao = operacao;
      this.numero1 = this.resultado.toString();
      this.numero2 = null;
      this.resultado = null;

    }
  }

  /**
   * Metodo que verifica se o segundo numero é vazio, caso contrario ele calcula.
   */
  calcular(): void{
    if(this.numero2===null){
      return;
    }

    this.resultado = this.calculadoraService.calcular(parseFloat(this.numero1),parseFloat(this.numero2),this.operacao);
  }

  /**
   * Metodo que exibe o resultado no display do HTML
   */
  get display(): string{

    if(this.resultado !== null){
      return this.resultado.toString();
    }
    if(this.numero2 !== null){
      return this.numero2;
    }
    return this.numero1;
  }

}
