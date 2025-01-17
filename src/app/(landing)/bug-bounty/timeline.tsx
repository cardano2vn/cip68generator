export default function Timeline() {
  // Dữ liệu các mốc thời gian
  const milestones = [
    {
      name: "Preparation Phase",
      dateRange: "22/11/2024 - 12/01/2025",
      position: [131.11111111111111, 100.57142857142857],
    },
    {
      name: "Registration Phase",
      dateRange: "15/01/2025 - 20/02/2024",
      position: [524.4444444444445, 100.57142857142857],
    },
    {
      name: "Bug Bounty Start Date",
      dateRange: "21/01/2025",
      position: [917.7777777777778, 100.57142857142857],
    },
    {
      name: "Bug Bounty End Date",
      dateRange: "19/02/2025",
      position: [721.1111111111111, 251.42857142857142],
    },
    {
      name: "Results Announcement",
      dateRange: "22/02/2025",
      position: [327.77777777777777, 251.42857142857142],
    },
  ];

  const getColor = (dateRange: string): string => {
    const now = new Date();
    const [day, month, year] = (dateRange.includes(" - ") ? dateRange.split(" - ")[0] : dateRange).split("/");
    const end = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return now > end ? "#ff9447" : "#979695";
  };

  return (
    <section id="timeline" className="w-full py-12 md:py-24 lg:py-32 ">
      <div className="px-4 md:px-6 mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 ">Timeline</h2>
        <div className="relative w-full mx-auto">
          <svg width="100%" height="100%" viewBox="0 0 1579 300" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(199.5, 0)">
              {/* Đường ngang */}
              <path d="M-330.6111111111111 100.57142857142857 L902.7777777777778 100.57142857142857" stroke="#ff9447" strokeWidth="2" fill="none" />
              <path
                d="M932.7777777777778 100.57142857142857 h98.33333333333334 c98.33333333333334,0 98.33333333333334,150.85714285714283 0,150.85714285714283 L342.77777777777777 251.42857142857142"
                stroke="#ff9447"
                strokeWidth="3"
                fill="none"
              />

              {/* Các mốc thời gian */}
              {milestones.map((milestone, index) => (
                <g key={index} transform={`translate(${milestone.position[0]}, ${milestone.position[1]})`}>
                  <circle r="15" fill={getColor(milestone.dateRange)} />
                  <circle r="15" stroke={getColor(milestone.dateRange)} strokeWidth="3" fill="none" />
                  <text y="-50" textAnchor="middle" className="font-semibold fill-white">
                    {milestone.name}
                  </text>
                  <text y="-28" textAnchor="middle" className="text-xs fill-gray-400">
                    {milestone.dateRange}
                  </text>
                </g>
              ))}
            </g>
          </svg>
        </div>

        <div className="mt-16 text-center text-gray-400 max-w-2xl mx-auto">
          <p>
            Please note that dates are subject to change due to the dynamic nature of the program. Make sure to follow official announcements to stay
            up to date.
          </p>
        </div>
      </div>
    </section>
  );
}
