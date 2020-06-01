import { Component, OnInit, HostBinding } from '@angular/core';
import { select } from 'd3';
import cloud from 'd3-cloud'
@Component({
  selector: 'app-word-cloud',
  template: `
    <div id="word-cloud"> <svg width="100%" height="500"></svg></div>
  `,
  styleUrls: ['./word-cloud.component.scss']
})
export class WordCloudComponent implements OnInit {

  @HostBinding('attr.ngNoHost') noHost = '';
  constructor() { }

  ngOnInit(): void {
    this.buildWordCount()
  }

  buildWordCount() {
    const svg = select('#word-cloud svg');
    const svgNode = svg.node();
    const boundingRect = svgNode.getBoundingClientRect();
    const WIDTH = parseInt(boundingRect.width);
    const HEIGHT = parseInt(svg.attr('height'));

    var layout = cloud()
      .size([WIDTH, HEIGHT])
      .words([
        "Hello", "world", "normally", "you", "want", "more", "words",
        "than", "this"].map(function (d) {
          return { text: d, size: 10 + Math.random() * 90, test: "haha" };
        }))
      .padding(5)
      .rotate(function () { return ~~(Math.random() * 2) * 90; })
      .font("Impact")
      .fontSize(function (d) { return d.size; })
      .on("end", draw);

    layout.start();
    function draw(words) {
      console.log(words)
      select("#word-cloud svg")
        .attr("width", layout.size()[0])
        .attr("height", layout.size()[1])
        .append("g")
        .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
        .selectAll("text")
        .data(layout.words())
        .enter().append("text")
        .style("font-size", function (d: any) { return d.size + "px"; })
        .style("font-family", "Impact")
        .attr("text-anchor", "middle")
        .attr("transform", function (d: any) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function (d: any) { return d.text; });
    }
  }



}
