$(function() {

        Morris.Donut({
        element: 'morris-donut-chart',
        data: [{ label: "Food", value: 12 },
            { label: "Service", value: 30 },
            { label: "Cost", value: 20 } ],
        resize: true,
        colors: ['#87d6c6', '#54cdb4','#1ab394'],
    });

    Morris.Donut({
        element: 'morris-donut-chart-2',
        data: [{ label: "Staff", value: 12 },
            { label: "Waiter", value: 12 },
            { label: "Manager", value: 6 } ],
        resize: true,
        colors: ['#87d6c6', '#54cdb4','#1ab394'],
    });
	
	    Morris.Donut({
        element: 'morris-donut-chart-3',
        data: [{ label: "Positive", value: 8 },
            { label: "Very Positive", value: 2 },
			{ label: "Negative", value: 1 },
            { label: "Very Negative", value: 1 } ],
        resize: true,
        colors: ['#87d6c6', '#54cdb4','#1ab394'],
    });
});
