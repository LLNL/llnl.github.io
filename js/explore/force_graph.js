function draw_force_graph(areaID) {

    var url = ghDataDir + '/labRepos_Dependencies.json';
    var files = [url];
    Promise.all(files.map(url => d3.json(url))).then(values => drawGraph(reformatData(values[0]), areaID));

    function drawGraph(data, areaID) {
        const graphHeader = 'LLNL Dependencies';

        const margin = { top: stdMargin.top, right: stdMargin.right / 2, bottom: stdMargin.bottom / 2, left: stdMargin.left / 2 },
            width = stdTotalWidth * 2 - margin.left - margin.right,
            height = stdTotalHeight * 2 - margin.top - margin.bottom;
        const legendRectSize = 15,
            legendSpacing = 4;

        const colors = ['#008080','#880808','#60E7AE'];

        const chart = d3
            .select('.' + areaID)
                .attr('width', width)
                .attr('height', height)
                .attr('viewBox', [-width / 2, -height / 2, width, height]);

        const nodes = data.nodes;
        const links = data.links;

        function weight(x) {
            const b = 0.15;
            const c = ( Math.exp(b) / ( Math.exp(100*b) - Math.exp(b) ) );
            const a = ( 1 + c ) * Math.exp(b);
            return a * Math.exp(-1 * b * x) - c;
        }

        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id(d => d.id).distance(d => 35 - 30 * weight(d.value)))
            .force('charge', d3.forceManyBody().strength(() => -20))
            .force('x', d3.forceX().strength(() => 0.14))
            .force('y', d3.forceY().strength(() => 0.14));

        chart
            .append('text')
            .attr('class', 'graphtitle')
            .attr('x', 0)
            .attr('y', 0 - (height / 2 - margin.top / 3))
            .attr('text-anchor', 'middle')
            .text(graphHeader);

        chart.append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', (Math.min(width - margin.left - margin.right, height - margin.top - margin.bottom) + 4) / 2)
            .attr('fill', '#FFFFFF')
            .attr('stroke', '#000000');

        const link = chart
            .append('g')
                .attr('stroke', '#999')
                .attr('stroke-opacity', 0.6)
            .selectAll('line')
            .data(links)
            .enter()
                .append('line')
                .attr('stroke-width', d => (100 - d.value) / 50);

        const node = chart
            .append('g')
                .attr('stroke', '#fff')
                .attr('stroke-width', 1.5)
            .selectAll('circle')
            .data(nodes)
            .enter()
            .append('circle')
                .attr('r', 5)
                .attr('fill', d => {
                    if (d.notPackage && !d.package) {
                        return colors[0];
                    } else if (!d.notPackage && d.package) {
                        return colors[1];
                    } else {
                        return colors[2];
                    }
                });
        
        const labels = ['LLNL Repositories with Dependencies', 'External Packages', 'Internal Packages'];
        const legendMap = [];
        colors.forEach((d, i) => {
            legendMap.push({ text: labels[i], color: d });
        });

        const legend = chart
            .append('g')
            .attr('id', 'foo')
            .selectAll('g')
            .data(legendMap)
                .join('g')
                .attr('class', 'legend')
                .attr('transform', (d, i) => {
                    const legendHeight = legendRectSize + legendSpacing;
                    const offset = (legendHeight * colors.length) / 2;
                    const horizontal = 0 - width / 2;
                    const vertical = i * legendHeight - height / 2;
                    return `translate(${horizontal}, ${vertical})`;
                });
        
        legend
            .append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)
            .style('fill', d => {
                return d.color;
            })
            .style('stroke', d => {
                return d.color;
            });

        legend
            .append('text')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .text(d => {
                return d.text;
            })
            .attr('text-anchor', 'start');

        node.append('title').text(d => d.id);
        link.append('title').text(d => `${d.source.name} : ${d.target.name}`);

        simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node
                .attr('cx', d => d.x)
                .attr('cy', d => d.y);
        });
    }

    function reformatData(obj) {
        const nodes = [];
        const links = [];
        for (var repo in obj['data']) {
            if (!nodes.some(d => d.id == repo)) {
                nodes.push({ name: repo.split('/')[1], id: repo, package: false, notPackage: true });
            } else {
                nodes[nodes.findIndex(d => d.id == repo)].notPackage = true;
            }
            for (var manifest of obj['data'][repo]['dependencyGraphManifests']['nodes']) {
                for (var node of manifest['dependencies']['nodes']) {
                    if (node['repository'] === null) {
                        continue;
                    }
                    if (!nodes.some(d => d.id == node['repository']['nameWithOwner'])) {
                        nodes.push({ name: node['repository']['name'], id: node['repository']['nameWithOwner'], package: true, notPackage: false });
                    } else {
                        nodes[nodes.findIndex(d => d.id == node['repository']['nameWithOwner'])].package = true;
                    }
                    links.push({ source: repo, target: node['repository']['nameWithOwner'], value: 1 });
                }
            }
        }
        return { nodes: nodes.filter(d => links.some(o => d.id == o.source || d.id == o.target)), links: links };
    }
}