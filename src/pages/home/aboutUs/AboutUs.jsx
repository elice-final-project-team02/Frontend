import React from 'react';
import styles from './AboutUs.module.scss';
import cs from 'classnames/bind';
import Title from 'components/typography/Title';
import Text from 'components/typography/Text';
import MainTitle from 'components/typography/MainTitle';
import MainText from 'components/typography/MainText';

const cx = cs.bind(styles);

export default function AboutUs() {
  return (
    <div className={cx('wrapper')}>
      <div className={styles.flexContainer}>
        <div className={styles.flexMainItem}>
          <MainTitle>쓰담쓰담 서비스는 무엇인가요?</MainTitle>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', height: '200px' }}>
            <MainText>
              "쓰담쓰담"이란 서비스는 돌봄이 중요한 현 시기에 여러 사람들이 함께 살아가는 공동체를 위해 만들어진
              플랫폼입니다. 지역사회를 위한 봉사활동과 돌봄 서비스를 제공하며, 이를 통해 사회에 좋은 영향력을 끼치려고
              합니다. 우리의 목표는 서로 돕고 함께 사는 아름다운 공동사회를 만들어가는 것입니다.
            </MainText>
          </div>
        </div>
        <div className={styles.flexImage} id="image">
          Character
        </div>
        <div className={styles.flexItem}>
          <Title>쓰담쓰담은 모든이들을 위한 서비스입니다.</Title>
          <Text>
            누구나 돌봄이 필요하다면 그 누구도 제외하지 않습니다. 어린이부터 노인, 장애인까지, 돌봄이 필요한 모든 이들이
            쓰담쓰담의 서비스를 신청할 수 있습니다.
          </Text>
        </div>
        <div className={styles.flexImage} id="image">
          Image
        </div>
        <div className={styles.flexImage} id="image">
          Image
        </div>
        <div className={styles.flexItem}>
          <Title>쓰담쓰담은 개인화된 돌봄서비스를 제공합니다.</Title>
          <Text>
            각 개인의 상황과 필요성에 맞춰 맞춤형 돌봄 서비스를 제공합니다. 우리는 각 개인의 특성과 상황을 고려하여,
            가장 적합한 돌봄 서비스를 제공하기 위해 노력합니다.
          </Text>
        </div>
        <div className={styles.flexItem}>
          <Title>쓰담쓰담은 사회적가치를 추구합니다.</Title>
          <Text>
            단순히 돌봄 서비스를 제공하는 것을 넘어, 사회적 가치를 추구합니다. 우리는 서로 돕고, 함께 성장하는 사회를
            만들기 위해 노력합니다. 이러한 목표를 향해, 쓰담쓰담은 계속해서 발전하고 성장할 것입니다.
          </Text>
        </div>
        <div className={styles.flexImage} id="image">
          Image
        </div>
        <div className={styles.flexImage} id="image">
          Image
        </div>
        <div className={styles.flexItem}>
          <Title>쓰담쓰담은 지역사회와 연결됩니다.</Title>
          <Text>
            지역사회 내의 봉사자 및 전문가와 연결하여, 돌봄 서비스를 제공합니다. 이를 통해 지역사회의 활성화와 돌봄
            서비스의 질을 높이는 데 기여합니다.
          </Text>
        </div>
      </div>
    </div>
  );
}
