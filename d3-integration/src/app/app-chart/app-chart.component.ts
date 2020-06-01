import { Component, OnInit } from '@angular/core';
import { selectAll, select, scaleBand, scaleLinear, axisBottom, axisLeft, max } from 'd3';
const data = {
  "ProjectInfo": [
    {
      "ProjectId": "1",
      "Client Name": "BCBSMA",
      "Client Description": "xxx",
      "Project Name": "BCBSMA-I",
      "Project Status": "Completed",
      "Total EBS Consulting Hours": "500",
      "Project Manager Name": "X1",
      "Team Count": "10",
      "Team Members": "X2,X3,X4,X5,X6,X7,X8,X9,X10,X11",
      "Project Start Date": "1/1/05",
      "Project End Date": "12/1/05"
    },
    {
      "ProjectId": "2",
      "Client Name": "BCBSMA",
      "Client Description": "xxx",
      "Project Name": "BCBSMA-II",
      "Project Status": "Ongoing",
      "Total EBS Consulting Hours": "223",
      "Project Manager Name": "Y1",
      "Team Count": "4",
      "Team Members": "Y2,Y3,Y4,Y5",
      "Project Start Date": "6/5/07",
      "Project End Date": "3/1/08"
    },
    {
      "ProjectId": "3",
      "Client Name": "BCBSMA",
      "Client Description": "xxx",
      "Project Name": "BCBSMA-III",
      "Project Status": "Yet to begin",
      "Total EBS Consulting Hours": "456",
      "Project Manager Name": "Z1",
      "Team Count": "12",
      "Team Members": "Z2,Z3,Z4,Z5,Z6,Z7,Z8,Z9,Z10,Z11,Z12,Z13",
      "Project Start Date": "7/8/20",
      "Project End Date": "10/31/21"
    },
    {
      "ProjectId": "4",
      "Client Name": "BCBSMA",
      "Client Description": "xxx",
      "Project Name": "BCBSMA-IV",
      "Project Status": "Completed",
      "Total EBS Consulting Hours": "123",
      "Project Manager Name": "A1",
      "Team Count": "9",
      "Team Members": "A2,A3,A4,A5,A6,A7,A8,A9,A10",
      "Project Start Date": "7/4/10",
      "Project End Date": "11/8/12"
    },
    {
      "ProjectId": "5",
      "Client Name": "ADI",
      "Client Description": "khdfkjasfkd asfkjsahd kjasdh",
      "Project Name": "ADI",
      "Project Status": "Ongoing",
      "Total EBS Consulting Hours": "645",
      "Project Manager Name": "B1",
      "Team Count": "5",
      "Team Members": "B2,B3,B4,B5,B6",
      "Project Start Date": "1/1/18",
      "Project End Date": "1/1/21"
    },
    {
      "ProjectId": "6",
      "Client Name": "AAAA",
      "Client Description": "kjsdnfkjdsf mbfdkjsab",
      "Project Name": "AAAA",
      "Project Status": "Completed",
      "Total EBS Consulting Hours": "762",
      "Project Manager Name": "C1",
      "Team Count": "6",
      "Team Members": "C2,C3,C4,C5,C6,C7",
      "Project Start Date": "1/1/06",
      "Project End Date": "12/1/06"
    },
    {
      "ProjectId": "7",
      "Client Name": "BBBB",
      "Client Description": "adsbsa ",
      "Project Name": "BBBB",
      "Project Status": "Ongoing",
      "Total EBS Consulting Hours": "234",
      "Project Manager Name": "X1",
      "Team Count": "8",
      "Team Members": "D2,D3,D4,D5,D6,D7,D8,D9",
      "Project Start Date": "6/5/09",
      "Project End Date": "3/1/10"
    },
    {
      "ProjectId": "8",
      "Client Name": "CCCC",
      "Client Description": "oitfyodfgknfd",
      "Project Name": "CCCC",
      "Project Status": "Yet to begin",
      "Total EBS Consulting Hours": "125",
      "Project Manager Name": "Y1",
      "Team Count": "7",
      "Team Members": "E1,E2,E3,E4,E5,E6,E7,",
      "Project Start Date": "8/8/20",
      "Project End Date": "1/31/21"
    },
    {
      "ProjectId": "9",
      "Client Name": "DDDD",
      "Client Description": "mnzxbcagd",
      "Project Name": "DDDD",
      "Project Status": "Completed",
      "Total EBS Consulting Hours": "983",
      "Project Manager Name": "Z1",
      "Team Count": "3",
      "Team Members": "F1,F2,F3",
      "Project Start Date": "7/4/13",
      "Project End Date": "11/8/15"
    },
    {
      "ProjectId": "10",
      "Client Name": "EEEE",
      "Client Description": "iuweyruiwe",
      "Project Name": "EEEE",
      "Project Status": "Ongoing",
      "Total EBS Consulting Hours": "672",
      "Project Manager Name": "A1",
      "Team Count": "11",
      "Team Members": "G1,G2,G3,G4,G5,G6,G7,G8,G9,G10,G11",
      "Project Start Date": "1/1/17",
      "Project End Date": "10/1/21"
    }
  ]
}


@Component({
  selector: 'app-app-chart',
  templateUrl: './app-chart.component.html',
  styleUrls: ['./app-chart.component.scss']
})
export class AppChartComponent implements OnInit {
  data: any;
  yAxisOptions: Array<string> = [];
  constructor() {
    this.data = data.ProjectInfo;
  }

  ngOnInit(): void {
    this.data = this.data.map(d => {
      return {
        ...d,
        'Team Count': +d['Team Count'],
        'Total EBS Consulting Hours': +d['Total EBS Consulting Hours'],
        'Project Start Date': new Date(d['Project Start Date']),
        'Project End Date': new Date(d['Project End Date'])
      }
    });
    this.yAxisOptions.push('Team Count', 'Total EBS Consulting Hours');
    this.buildGraph(this.yAxisOptions[0]);
  }

  handleYAxisChange(event) {
    this.updateGraph(event.target.value)
  }
  buildGraph(yAxisPoint) {
    const svg = select('svg');
    const TITLE = "PROJECTS COE";
    const svgNode = svg.node();
    const boundingRect = svgNode.getBoundingClientRect();
    const WIDTH = parseInt(boundingRect.width, 10)
    const HEIGHT = parseInt(svg.attr('height'), 10)
    const MARGIN = { top: 20, right: 20, bottom: 60, left: 70 };
    const INNER_WIDTH = WIDTH - MARGIN.left - MARGIN.right;
    const INNER_HEIGHT = HEIGHT - MARGIN.top - MARGIN.bottom;
    const xAXIS_LABEL = "Project Name";
    const yAXIS_LABEL = yAxisPoint;
    const xValue = d => d[xAXIS_LABEL];
    const yValue = d => +d[yAxisPoint];

    const xScale = scaleBand()
      .domain(this.data.map(xValue))
      .range([0, INNER_WIDTH])
      .padding(0.1)

    const yScale = scaleLinear()
      .domain([0, max(this.data, yValue)])
      .range([INNER_HEIGHT, 0])

    const yAxis = axisLeft(yScale);
    const xAxis = axisBottom(xScale);
    const g = svg
      .attr('width', WIDTH)
      .append('g')
      .attr('transform', `translate(${MARGIN.left},${MARGIN.top})`);

    const yAxisGroup = g.append('g').attr('class', 'y-axis').call(yAxis);
    yAxisGroup.append('text')
      .attr("transform", 'rotate(-90)')
      .text(yAXIS_LABEL)
      .attr('class', 'y-axis-label')
      .attr('fill', '#000')
      .attr('text-anchor', 'middle')
      .attr('x', -INNER_HEIGHT / 2)
      .attr('y', -40)

    const xAxisGroup = g.append('g').call(xAxis)
      .attr('transform', `translate(0, ${INNER_HEIGHT})`);

    xAxisGroup.append('text')
      .text(xAXIS_LABEL)
      .attr('class', 'x-axis-label')
      .attr('fill', '#000')
      .attr('x', INNER_WIDTH / 2)
      .attr('y', MARGIN.bottom - 10)

    g.selectAll('rect').data(this.data)
      .enter().append('rect')
      .attr('width', xScale.bandwidth())
      .attr('fill', d => {
        switch (d['Project Status']) {
          case 'Completed':
            return '#5C8100';
          case 'Ongoing':
            return '#A0B700';
          case 'Yet to begin':
            return '#978F80';
          default:
            return '#978F80'

        }
      })
      .attr('height', d => INNER_HEIGHT - yScale(yValue(d)))
      .attr('y', d => yScale(yValue(d)))
      .attr('x', d => xScale(xValue(d)))
  }
  updateGraph(yAxisPoint) {
    const svg = select('svg');
    const TITLE = "PROJECTS COE"
    const WIDTH = +svg.attr('width');
    const HEIGHT = +svg.attr('height');
    const MARGIN = { top: 20, right: 20, bottom: 60, left: 70 };
    const INNER_WIDTH = WIDTH - MARGIN.left - MARGIN.right;
    const INNER_HEIGHT = HEIGHT - MARGIN.top - MARGIN.bottom;
    const xAXIS_LABEL = "Project Name";
    const yAXIS_LABEL = yAxisPoint;
    const xValue = d => d[xAXIS_LABEL];
    const yValue = d => +d[yAxisPoint];

    const xScale = scaleBand()
      .domain(this.data.map(xValue))
      .range([0, INNER_WIDTH])
      .padding(0.1)

    const yScale = scaleLinear()
      .domain([0, max(this.data, yValue)])
      .range([INNER_HEIGHT, 0])

    const yAxis = axisLeft(yScale);
    // const xAxis = axisBottom(xScale);
    // const g = svg.append('g')
    //   .attr('transform', `translate(${MARGIN.left},${MARGIN.top})`);

    svg.select('g.y-axis')
      .transition()
      .delay(500)
      .call(yAxis)

    svg.select('.y-axis-label')
      .transition()
      .delay(500)
      .text(yAXIS_LABEL)

    svg.selectAll('rect').data(this.data)
      .transition()
      .delay(500)
      .attr('width', xScale.bandwidth())
      .attr('height', d => INNER_HEIGHT - yScale(yValue(d)))
      .attr('y', d => yScale(yValue(d)))
      .attr('x', d => xScale(xValue(d)))
  }
}
