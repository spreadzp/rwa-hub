'use client';
import Collaboration from './Collaboration';
import { Statistic } from './Statistic';
import FeatureSlider from './FeatureSlider';
import sliderItems from './sliderItems';
import StarryBackground from '@/app/components/common/StarryBackground';
import RwaList from '@/app/components/rwa/RwaList';

const Landing: React.FC = () => {
    return (
        <>
            <StarryBackground />
            <div className="min-h-screen">
                <div className="container mx-auto p-4">
                    <div className="landing">
                        <FeatureSlider items={sliderItems} />
                        <div className="mt-8"></div>
                        <RwaList />

                        <Collaboration />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Landing;