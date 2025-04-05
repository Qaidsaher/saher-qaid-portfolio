import React from "react";
import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout"; // Adjusted import path
import { Button } from "@/components/ui/button"; // Adjusted import path
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"; // Adjusted import path
import { Badge } from "@/components/ui/badge"; // Adjusted import path
import {
    ResponsiveContainer, // Import ResponsiveContainer
    Bar,
    BarChart,
    Line,
    LineChart,
    Pie,
    PieChart,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    PieLabelRenderProps // For custom pie labels if needed
} from "recharts";
import {
    ChartContainer,
    ChartTooltip, // Use shadcn's ChartTooltip
    ChartTooltipContent,
    ChartLegend, // Use shadcn's ChartLegend
    ChartLegendContent,
    ChartConfig,
} from "@/components/ui/chart"; // Adjusted import path
import {
    Users,
    Briefcase,
    FileText,
    MessageCircle,
    Award,
    BookOpen,
    CheckCircle,
    Trophy,
    Activity,
    TrendingUpIcon,
    TrendingDownIcon,
    MinusIcon, // For neutral trend
    ArrowRight,
} from "lucide-react";

// --- Data Interfaces ---

// Represents data for a single metric card
interface MetricData {
    current: number;
    trendValue: number; // e.g., 8, -5, 0
    trendDirection: 'up' | 'down' | 'neutral';
}

// Represents visitor data for charts
interface VisitorData {
    month: string; // Expect full month name or abbreviation from backend
    desktop: number;
    mobile: number;
}

// Represents project distribution data
interface ProjectsByType {
    type: string;
    count: number;
    fill: string; // Add fill color directly to data for Pie chart
}

// Combined Props for the Dashboard Page
interface DashboardPageProps extends PageProps {
    userCount: MetricData;
    projectCount: MetricData;
    articleCount: MetricData;
    testimonialCount: MetricData;
    experienceCount: MetricData;
    serviceCount: MetricData;
    skillCount: MetricData;
    educationCount: MetricData;
    certificationCount: MetricData;
    awardCount: MetricData;
    visitorCount: MetricData; // Assuming visitor count also has trend data
    visitorChartData: VisitorData[];
    projectsByTypeData: ProjectsByType[];
    // Add any other props passed from Laravel
    [key: string]: any;
}

// --- Chart Configurations ---

const visitorChartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))", // Use CSS variables from shadcn/ui theme
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))", // Use CSS variables
    },
} satisfies ChartConfig; // Use 'satisfies' for type checking

// Define colors for the pie chart slices (can be passed from backend too)
// Example: Ensure `projectsByTypeData` includes a 'fill' property
// const projectsByTypeColors = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];


// --- Reusable Components ---

interface SectionTitleProps {
    title: string;
    className?: string;
}

// A simpler section title
const SectionTitle: React.FC<SectionTitleProps> = ({ title, className = "" }) => {
    return (
        <h2 className={`text-2xl font-semibold tracking-tight text-gray-800 dark:text-gray-200 mb-6 mt-8 ${className}`}>
            {title}
        </h2>
    );
};

interface SummaryCardProps {
    title: string;
    metric: MetricData;
    footerText: string;
    Icon: React.ElementType;
    iconColor?: string; // Optional: If specific override needed, else use theme
    actionLink?: string; // Optional link for "View Details"
}

// Refined Summary Card Component
const SummaryCard: React.FC<SummaryCardProps> = ({
    title,
    metric,
    footerText,
    Icon,
    iconColor, // Use sparingly, prefer theme colors
    actionLink,
}) => {
    const TrendIcon =
        metric.trendDirection === 'up'
            ? TrendingUpIcon
            : metric.trendDirection === 'down'
            ? TrendingDownIcon
            : MinusIcon;

    const trendColor =
        metric.trendDirection === 'up'
            ? 'text-green-600 dark:text-green-400'
            : metric.trendDirection === 'down'
            ? 'text-red-600 dark:text-red-400'
            : 'text-gray-500 dark:text-gray-400';

    const trendPrefix = metric.trendDirection === 'up' ? '+' : '';

    return (
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 dark:bg-gray-800">
            <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                    <div>
                        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">{title}</CardDescription>
                        <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
                            {metric.current} {/* Format number */}
                        </CardTitle>
                    </div>
                    <div className={`p-3 rounded-lg bg-primary/10 flex items-center justify-center`}
                         style={iconColor ? { backgroundColor: `${iconColor}1A`, color: iconColor } : {}} // Inline style for specific color override
                    >
                         <Icon className={`h-6 w-6 ${iconColor ? '' : 'text-primary'}`} />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-0 pb-4">
                 <div className={`text-xs ${trendColor} flex items-center gap-1 font-medium`}>
                        <TrendIcon className="h-4 w-4" />
                        {trendPrefix}{metric.trendValue}% {footerText}
                 </div>
            </CardContent>
             {/* Optional Footer Link */}
            {actionLink && (
                 <CardFooter className="pt-0">
                      <Button variant="link" className="p-0 h-auto text-sm text-primary" onClick={() => Inertia.visit(actionLink)}>
                           View Details <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                 </CardFooter>
            )}
        </Card>
    );
};


// --- Dashboard Component ---

export default function Dashboard() {
    // Use generic type assertion for better type safety with usePage
    const { props } = usePage<DashboardPageProps>();
    const {
        userCount,
        projectCount,
        articleCount,
        testimonialCount,
        experienceCount,
        serviceCount,
        skillCount,
        educationCount,
        certificationCount,
        awardCount,
        visitorCount,
        visitorChartData,
        projectsByTypeData,
    } = props;

    // Breadcrumbs for AppLayout
    const breadcrumbs = [{ title: "Dashboard", href: route("dashboard") }]; // Use Ziggy route helper if available

    // Prepare Pie Chart data (ensure 'fill' is provided from backend or map here)
    // Example if you need to map colors here:
    // const projectsByTypeColors = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];
    // const formattedProjectsData = projectsByTypeData.map((item, index) => ({
    //   ...item,
    //   fill: projectsByTypeColors[index % projectsByTypeColors.length],
    // }));

    return (
        // Assuming AppLayout handles the overall page structure and dark mode context
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* --- Overview Section --- */}
                <SectionTitle title="Overview" />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <SummaryCard
                        title="Total Users"
                        metric={userCount}
                        footerText="vs last month"
                        Icon={Users}
                        // iconColor="hsl(var(--chart-1))" // Use theme color implicitly or override if needed
                    />
                    <SummaryCard
                        title="Site Visitors"
                        metric={visitorCount}
                        footerText="vs last month"
                        Icon={Activity}
                        // iconColor="hsl(var(--chart-2))"
                    />
                    <SummaryCard
                        title="Projects"
                        metric={projectCount}
                        footerText="new projects"
                        Icon={Briefcase}
                        // iconColor="hsl(var(--chart-3))"
                    />
                    <SummaryCard
                        title="Articles"
                        metric={articleCount}
                        footerText="new articles"
                        Icon={FileText}
                        // iconColor="hsl(var(--chart-4))"
                    />
                </div>

                 {/* --- Charts Section --- */}
                 <SectionTitle title="Analytics" />
                 <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Visitor Trend Chart (Line) */}
                    <Card className="dark:bg-gray-800">
                         <CardHeader>
                              <CardTitle>Visitor Trends</CardTitle>
                              <CardDescription>Desktop vs Mobile visits over time</CardDescription>
                         </CardHeader>
                         <CardContent>
                              <ChartContainer config={visitorChartConfig} className="h-[300px] w-full">
                                   {/* ResponsiveContainer makes the chart adapt */}
                                   <ResponsiveContainer width="100%" height="100%">
                                        <LineChart
                                             accessibilityLayer // Good for accessibility
                                             data={visitorChartData}
                                             margin={{ top: 5, right: 10, left: -10, bottom: 0 }} // Adjust margins
                                        >
                                             <XAxis
                                                  dataKey="month"
                                                  tickLine={false}
                                                  axisLine={false}
                                                  tickMargin={8}
                                                  tickFormatter={(value) => value.slice(0, 3)} // Abbreviate month names
                                                  className="text-xs text-gray-500 dark:text-gray-400"
                                             />
                                              <YAxis
                                                  tickLine={false}
                                                  axisLine={false}
                                                  tickMargin={8}
                                                  className="text-xs text-gray-500 dark:text-gray-400"
                                              />
                                             <ChartTooltip
                                                  cursor={false}
                                                  content={<ChartTooltipContent indicator="line" />} // Use shadcn tooltip
                                             />
                                             <ChartLegend content={<ChartLegendContent />} />
                                             <Line
                                                  dataKey="desktop"
                                                  type="monotone"
                                                  stroke="var(--color-desktop)"
                                                  strokeWidth={2}
                                                  dot={false} // Cleaner look without dots
                                             />
                                             <Line
                                                  dataKey="mobile"
                                                  type="monotone"
                                                  stroke="var(--color-mobile)"
                                                  strokeWidth={2}
                                                  dot={false}
                                             />
                                        </LineChart>
                                   </ResponsiveContainer>
                              </ChartContainer>
                         </CardContent>
                    </Card>

                     {/* Projects by Type (Pie) */}
                     <Card className="dark:bg-gray-800 flex flex-col"> {/* Use flex-col for height */}
                         <CardHeader>
                              <CardTitle>Projects by Type</CardTitle>
                              <CardDescription>Distribution of different project types</CardDescription>
                         </CardHeader>
                         <CardContent className="flex-1 pb-0"> {/* flex-1 to grow */}
                              <ChartContainer
                                   config={{}} // No specific config needed if colors are in data
                                   className="h-[300px] w-full"
                              >
                                   <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                              <ChartTooltip
                                                  content={<ChartTooltipContent hideLabel />} // Simpler tooltip
                                              />
                                             <Pie
                                                  data={projectsByTypeData} // Use data with 'fill' property
                                                  dataKey="count"
                                                  nameKey="type"
                                                  cx="50%"
                                                  cy="50%"
                                                  outerRadius={100} // Adjust size
                                                  innerRadius={40} // Make it a donut chart
                                                  labelLine={false} // Cleaner look
                                                  label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: PieLabelRenderProps) => {
                                                      // Optional: Custom label rendering
                                                      const safeInnerRadius = Number(innerRadius) || 0;
                                                      const safeOuterRadius = Number(outerRadius) || 0;
                                                      const radius = safeInnerRadius + (safeOuterRadius - safeInnerRadius) * 0.5;
                                                      // @ts-ignore - recharts types might be tricky here
                                                      const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                                                      // @ts-ignore
                                                      const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                                                      return (
                                                          <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-xs font-medium">
                                                              {`${((percent ?? 0) * 100).toFixed(0)}%`}
                                                          </text>
                                                      );
                                                  }}
                                             >
                                                  {projectsByTypeData.map((entry, index) => (
                                                       <Cell key={`cell-${index}`} fill={entry.fill} /* Use fill from data */ />
                                                  ))}
                                             </Pie>
                                             <ChartLegend content={<ChartLegendContent nameKey="type" className="mt-4" />} />
                                        </PieChart>
                                   </ResponsiveContainer>
                              </ChartContainer>
                         </CardContent>
                    </Card>
                </div>


                {/* --- Detailed Stats Section --- */}
                <SectionTitle title="Detailed Statistics" />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                     {/* Add more SummaryCards as needed, grouped logically */}
                     <SummaryCard title="Experiences" metric={experienceCount} footerText="updates" Icon={Briefcase} />
                     <SummaryCard title="Services Offered" metric={serviceCount} footerText="changes" Icon={CheckCircle} />
                     <SummaryCard title="Skills Added" metric={skillCount} footerText="new skills" Icon={Award} />
                     <SummaryCard title="Education Records" metric={educationCount} footerText="additions" Icon={BookOpen} />
                     <SummaryCard title="Certifications" metric={certificationCount} footerText="earned" Icon={CheckCircle} />
                     <SummaryCard title="Awards Recieved" metric={awardCount} footerText="achievements" Icon={Trophy} />
                     <SummaryCard title="Testimonials" metric={testimonialCount} footerText="new feedback" Icon={MessageCircle} />
                     {/* Add more cards here */}
                </div>


                {/* --- Actions --- */}
                {/* Keep actions minimal on dashboard, maybe link to full reports */}
                 {/* Example: Link to a reports page */}
                {/*
                <div className="mt-8 flex justify-end">
                    <Button onClick={() => Inertia.visit(route('reports.index'))}>
                        View All Reports <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
                */}
            </div>
        </AppLayout>
    );
}
