import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js';


@Component({
  selector: 'app-purchase-reports',
  templateUrl: './purchase-reports.component.html',
  styleUrls: ['./purchase-reports.component.scss'],
  standalone: false
})
export class PurchaseReportsComponent implements OnInit {
  @ViewChild('barChart') barChart: any;

  summaryStats = [
    {
      label: 'إجمالي طلبات الشراء',
      value: '1,234',
      icon: 'pi pi-shopping-cart',
      trend: 12
    },
    {
      label: 'الطلبات المقبولة',
      value: '987',
      icon: 'pi pi-check-circle',
      trend: 8
    },
    {
      label: 'الطلبات المرفوضة',
      value: '247',
      icon: 'pi pi-times-circle',
      trend: -5
    },
    {
      label: 'معدل التحويل',
      value: '78%',
      icon: 'pi pi-chart-line',
      trend: 15
    }
  ];

  selectedMonth: string | null = null;
  monthDetails = {
    totalRequests: 0,
    accepted: 0,
    rejected: 0,
    converted: 0,
    conversionRate: 0,
    labels: {
      totalRequests: 'إجمالي الطلبات',
      accepted: 'مقبول',
      rejected: 'مرفوض',
      converted: 'تم التحويل إلى منتجات',
      conversionRate: 'معدل التحويل'
    }
  };

  monthlyOrdersData: ChartData = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    datasets: [
      {
        label: 'Purchase Orders',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: Array(6).fill('rgba(26, 188, 156, 0.3)'), // Lighter default color
        borderColor: Array(6).fill('rgba(26, 188, 156, 0.5)'),
        borderWidth: Array(6).fill(1),
        hoverBackgroundColor: 'rgba(26, 188, 156, 0.5)',
        hoverBorderColor: 'rgba(26, 188, 156, 0.7)',
        hoverBorderWidth: 2
      }
    ]
  };

  statusDistributionData: ChartData = {
    labels: ['مقبول', 'مرفوض', 'قيد الانتظار'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: [
          'rgba(26, 188, 156, 0.7)',
          'rgba(231, 76, 60, 0.7)',
          'rgba(241, 196, 15, 0.7)'
        ],
        hoverBackgroundColor: [
          'rgba(26, 188, 156, 1)',
          'rgba(231, 76, 60, 1)',
          'rgba(241, 196, 15, 1)'
        ]
      }
    ]
  };

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: { 
          color: '#495057',
          textAlign: 'right'
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const isSelected = this.selectedMonth === this.monthlyOrdersData.labels?.[context.dataIndex];
            return `${isSelected ? '✓ ' : ''} طلبات ${context.parsed.y}`;
          }
        },
        backgroundColor: 'rgba(26, 188, 156, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
        cornerRadius: 8
      }
    },
    onClick: (event: any, elements: any) => {
      if (elements && elements.length > 0) {
        const index = elements[0].index;
        const month = this.monthlyOrdersData.labels?.[index] as string;
        this.selectMonth(month);
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      },
      x: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      }
    },
    hover: {
      mode: 'index',
      intersect: false
    },
    animation: {
      duration: 300 // Faster transitions
    }
  };

  pieOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#495057'
        }
      }
    }
  };

  constructor() {}

  ngOnInit() {
    // Set initial month and trigger selection
    this.selectedMonth = this.monthlyOrdersData.labels?.[0] as string;
    setTimeout(() => {
      this.selectMonth(this.selectedMonth as string);
    });
  }

  onMonthSelect(event: any) {
    if (event.element && !event.element.removed) {
      const index = event.element.index;
      const month = this.monthlyOrdersData.labels?.[index] as string;
      this.selectMonth(month);
    }
  }

  onChartClick(event: any) {
    // Get click coordinates
    const elements = this.barChart.chart.getElementsAtEventForMode(
      event,
      'nearest',
      { intersect: true },
      false
    );

    if (elements && elements.length > 0) {
      const index = elements[0].index;
      const month = this.monthlyOrdersData.labels?.[index] as string;
      
      // Don't reselect if already selected
      if (this.selectedMonth === month) {
        return;
      }

      // Highlight the clicked bar and update data
      this.selectMonth(month);

      // Scroll monthly details into view if on mobile
      setTimeout(() => {
        const monthlyDetails = document.querySelector('.monthly-details');
        if (monthlyDetails && window.innerWidth <= 768) {
          monthlyDetails.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }

  selectMonth(month: string) {
    this.selectedMonth = month;
    
    if (this.barChart) {
      const chart = this.barChart.chart;
      const datasetIndex = 0;
      const index = this.monthlyOrdersData.labels?.indexOf(month) ?? -1;
      
      // Reset all bars to an even more muted style
      const backgroundColors = Array(chart.data.labels?.length)
        .fill('rgba(26, 188, 156, 0.3)');
      const borderColors = Array(chart.data.labels?.length)
        .fill('rgba(26, 188, 156, 0.5)');
      const borderWidths = Array(chart.data.labels?.length).fill(1);
      
      // Make selected bar stand out more
      if (index !== -1) {
        backgroundColors[index] = 'rgba(211, 84, 0, 0.8)';
        borderColors[index] = 'rgba(211, 84, 0, 1)';
        borderWidths[index] = 3;
        
        // Immediate update of dataset properties
        const dataset = chart.data.datasets[datasetIndex];
        dataset.backgroundColor = backgroundColors;
        dataset.borderColor = borderColors;
        dataset.borderWidth = borderWidths;
        
        // Force immediate chart update
        chart.update('none'); // Use 'none' for immediate update
        
        // Add visual indicator for selected bar
        requestAnimationFrame(() => {
          const meta = chart.getDatasetMeta(0);
          meta.data.forEach((bar: any, i: number) => {
            if (i === index) {
              bar.element?.classList?.add('selected-bar');
            } else {
              bar.element?.classList?.remove('selected-bar');
            }
          });
        });
      }
    }

    // Generate realistic mock data based on the month
    const monthIndex = this.monthlyOrdersData.labels?.indexOf(month) ?? 0;
    const baseValue = this.monthlyOrdersData.datasets[0].data[monthIndex] as number;
    
    this.monthDetails = {
      totalRequests: baseValue,
      accepted: Math.floor(baseValue * 0.8), // 80% acceptance rate
      rejected: Math.floor(baseValue * 0.2), // 20% rejection rate
      converted: Math.floor(baseValue * 0.6), // 60% conversion rate
      conversionRate: Math.floor((baseValue * 0.6 / baseValue) * 100), // Conversion percentage
      labels: {
        totalRequests: 'إجمالي الطلبات',
        accepted: 'مقبول',
        rejected: 'مرفوض',
        converted: 'تم التحويل إلى منتجات',
        conversionRate: 'معدل التحويل'
      }
    };

    // Update the pie chart data to reflect the current month
    this.statusDistributionData = {
      labels: ['مقبول', 'مرفوض', 'قيد الانتظار'],
      datasets: [{
        data: [
          this.monthDetails.accepted,
          this.monthDetails.rejected,
          baseValue - (this.monthDetails.accepted + this.monthDetails.rejected)
        ],
        backgroundColor: [
          'rgba(26, 188, 156, 0.7)',
          'rgba(231, 76, 60, 0.7)',
          'rgba(241, 196, 15, 0.7)'
        ],
        hoverBackgroundColor: [
          'rgba(26, 188, 156, 1)',
          'rgba(231, 76, 60, 1)',
          'rgba(241, 196, 15, 1)'
        ]
      }]
    };
  }

  closeMonthDetails() {
    this.selectedMonth = null;
  }

  // Add more methods for handling data updates and user interactions
}
