import React from 'react';
import styles from './AboutUs.module.scss';
import cs from 'classnames/bind';
import { Title, Text, MainTitle, MainText, FlexItem } from '../../../components/typography';

const cx = cs.bind(styles);

export default function AboutUs() {
  return (
    <div className={cx('wrapper')}>
      <div className={styles.flexContainer}>
        <div className={styles.flexMainItem}>
          <MainTitle>쓰담쓰담 서비스는 무엇인가요?</MainTitle>
          <div>
            <MainText>
              돌봄이 중요한 현 시기에 여러 사람들이 함께 살아가는 공동체를 위해 만들어진 플랫폼입니다. 지역사회를 위한
              봉사활동과 돌봄 서비스를 제공하며, 이를 통해 사회에 좋은 영향력을 끼치려고 합니다. 우리의 목표는 서로 돕고
              함께 사는 아름다운 공동사회를 만들어가는 것입니다.
            </MainText>
          </div>
        </div>
        <div className={styles.flexImage} id="image">
          Image
        </div>
        <FlexItem backgroundColor="#ffefef" hoverColor="#ffd6d6">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Title style={{ flex: 1 }}>
              <div>쓰담쓰담은</div>
              <div>
                <span style={{ color: 'black' }}>돌봄이 필요한 모든이들</span>을 위한 서비스입니다.
              </div>
            </Title>
            <Text style={{ flex: 1 }}>
              누구나 돌봄이 필요하다면 그 누구도 제외하지 않습니다. 어린이부터 노인, 장애인까지, 돌봄이 필요한 모든
              이들이 쓰담쓰담의 서비스를 신청할 수 있습니다.
            </Text>
          </div>
        </FlexItem>
        <FlexItem backgroundColor="#e3e8f6" hoverColor="#d0d8f0">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Title style={{ flex: 1 }}>
              <div>쓰담쓰담은</div>
              <div>
                <span style={{ color: 'black' }}>개인화된 돌봄서비스</span>를 제공합니다.
              </div>
            </Title>
            <Text style={{ flex: 1 }}>
              각 개인의 상황과 필요성에 맞춰 맞춤형 돌봄 서비스를 제공합니다. 우리는 각 개인의 특성과 상황을 고려하여,
              가장 적합한 돌봄 서비스를 제공하기 위해 노력합니다.
            </Text>
          </div>
        </FlexItem>
        <FlexItem backgroundColor="#ffffec" hoverColor="#ffffd3">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Title style={{ flex: 1 }}>
              <div>쓰담쓰담은</div>
              <div>
                <span style={{ color: 'black' }}>사회적가치</span>를 추구합니다.
              </div>
            </Title>
            <Text style={{ flex: 1 }}>
              단순히 돌봄 서비스를 제공하는 것을 넘어, 사회적 가치를 추구합니다. 우리는 서로 돕고, 함께 성장하는 사회를
              만들기 위해 노력합니다. 이러한 목표를 향해, 쓰담쓰담은 계속해서 발전하고 성장할 것입니다.
            </Text>
          </div>
        </FlexItem>
        <FlexItem backgroundColor="#f6f6f6" hoverColor="#e9e9e9">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Title style={{ flex: 1 }}>
              <div>쓰담쓰담은</div>
              <div>
                <span style={{ color: 'black' }}>지역사회</span>와 연결됩니다.
              </div>
            </Title>
            <Text style={{ flex: 1 }}>
              지역사회 내의 봉사자 및 전문가와 연결하여, 돌봄 서비스를 제공합니다. 이를 통해 지역사회의 활성화와 돌봄
              서비스의 질을 높이는 데 기여합니다.
            </Text>
          </div>
        </FlexItem>
      </div>
    </div>
  );
}
