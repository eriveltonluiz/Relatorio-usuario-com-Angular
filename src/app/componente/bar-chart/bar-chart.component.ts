import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { UsuarioChart } from 'src/app/model/usuario-chart';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  usuarioChart = new UsuarioChart();
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.carregarGrafico().subscribe(data => {
      this.usuarioChart = data
      console.log(this.usuarioChart)
      this.barChartLabels = this.usuarioChart.nome.split(',');

      let arraySalario = JSON.parse('[' + this.usuarioChart.salario + ']')
      console.log(arraySalario)
      this.barChartData = [
        { data: arraySalario, label: 'Salário Usuário' }
      ];
    })
  }

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Salário Usuário' }
  ];

}
