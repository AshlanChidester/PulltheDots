<div class="separator" style="clear: both; text-align: center;"><a href="https://blogger.googleusercontent.com/img/a/AVvXsEjsD9XLJ_1yxu0FWLKvRDRC84Vv7Pr8UVh4EC5OLtpp4GNJg2J9GC_SgKvKi6n-fTTXkC_UD-YGdWxovBv4xw8D4k46F8QkXeFkGfAaLRgGURDLE2ZhZFXaSvtSlis3eE6dXF3Ir_ZI69aZxhkfQ8zOq4BAw398Ri3-uZd84cdnBJXwxneNKHZ7ag1tbpRK" style="margin-left: 1em; margin-right: 1em;"><img alt="" data-original-height="1286" data-original-width="1418" height="240" src="https://blogger.googleusercontent.com/img/a/AVvXsEjsD9XLJ_1yxu0FWLKvRDRC84Vv7Pr8UVh4EC5OLtpp4GNJg2J9GC_SgKvKi6n-fTTXkC_UD-YGdWxovBv4xw8D4k46F8QkXeFkGfAaLRgGURDLE2ZhZFXaSvtSlis3eE6dXF3Ir_ZI69aZxhkfQ8zOq4BAw398Ri3-uZd84cdnBJXwxneNKHZ7ag1tbpRK" width="265" /></a></div><br /><div id="chart"></div>

<script src="https://d3js.org/d3.v3.min.js"></script>
<script>
  // Canvas dimensions
  var w = 700,
      h = 700,
      fill = d3.scale.category20();

  // Create SVG element
  var vis = d3.select("#chart")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  // Artificial data for a cool-looking graph
  var json = {
    "nodes": [
      { "name": "AI Bot", "group": 1, "attr": { "name": "Artificial Intelligence" } },
      { "name": "Neural Net", "group": 1, "attr": { "name": "Deep Learning" } },
      { "name": "Big Data", "group": 2, "attr": { "name": "Data Science" } },
      { "name": "Cloud", "group": 2, "attr": { "name": "AWS & Azure" } },
      { "name": "Robotics", "group": 3, "attr": { "name": "Automation" } },
      { "name": "IoT", "group": 3, "attr": { "name": "Smart Devices" } }
    ],
    "links": [
      { "source": 0, "target": 1, "count": 1, "penwidth": 3, "color": "red", "cls": "DMVPN" },
      { "source": 1, "target": 2, "count": 2, "penwidth": 4, "color": "blue" },
      { "source": 2, "target": 3, "count": 3, "penwidth": 2, "color": "green", "cls": "DMVPN" },
      { "source": 3, "target": 4, "count": 1, "penwidth": 2, "color": "purple" },
      { "source": 4, "target": 5, "count": 2, "penwidth": 3, "color": "orange" },
      { "source": 5, "target": 0, "count": 3, "penwidth": 4, "color": "gray" }
    ]
  };

  // Define force layout
  var force = d3.layout.force()
    .charge(-500)
    .linkDistance(200)
    .nodes(json.nodes)
    .links(json.links)
    .size([w, h])
    .start();

  // Add links
  var link = vis.selectAll("path.link")
    .data(json.links)
    .enter()
    .append("path")
    .attr("class", "link")
    .style("stroke-width", function (d) { return d.penwidth || 2; })
    .style("fill", "none")
    .style("stroke", function (d) { return d.color || "#999"; })
    .style("stroke-dasharray", function (d) {
      return d.cls === "DMVPN" ? "10,10" : "none";
    });

  // Add nodes
  var gnode = vis.selectAll("g.gnode")
    .data(json.nodes)
    .enter()
    .append("g")
    .classed("gnode", true);

  // Add circles
  var node = gnode.append("circle")
    .attr("class", "node")
    .attr("r", 10)
    .style("fill", function (d) { return fill(d.group); })
    .call(force.drag);

  // Add titles (tooltips)
  node.append("title")
    .text(function (d) { return d.name; });

  // Add labels
  gnode.append("text")
    .attr("dx", 12)
    .attr("dy", ".35em")
    .text(function (d) { return d.attr.name || d.name; });

  // Force layout update
  force.on("tick", function () {
    link.attr("d", function (d) {
      var x1 = d.source.x,
          y1 = d.source.y,
          x2 = d.target.x,
          y2 = d.target.y,
          dx = x2 - x1,
          dy = y2 - y1,
          dr = Math.sqrt(dx * dx + dy * dy) - Math.sqrt(300 * (d.count - 1));

      return d.count % 2
        ? `M${x1},${y1}A${dr},${dr} 0 0,1 ${x2},${y2}`
        : `M${x1},${y1}A${dr},${dr} 0 0,0 ${x2},${y2}`;
    });

    gnode.attr("transform", function (d) {
      return `translate(${d.x},${d.y})`;
    });
  });
</script>
