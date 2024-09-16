'use client';
import Collaboration from './Collaboration';
import FeatureSlider from './FeatureSlider';
import sliderItems from './sliderItems';
import RwaList from '@/app/components/rwa/RwaList';

const Landing: React.FC = () => {
    return (
        <>
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