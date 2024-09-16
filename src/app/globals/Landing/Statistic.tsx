
import Title, { TitleEffect, TitleSize } from "@/app/components/common/Title";

export const Statistic = () => {
    return (
        <div className="statistic p-4 bg-white bg-opacity-20 text-white">
            <Title
                titleName="Statistics"
                titleSize={TitleSize.H3}
                titleEffect={TitleEffect.Gradient}
            />

            {/* <StatisticInfo /> */}
        </div>
    );
}