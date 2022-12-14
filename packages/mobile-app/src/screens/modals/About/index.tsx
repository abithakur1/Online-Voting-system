import { DrawerNavigationProp } from '@react-navigation/drawer';
import deepmerge from 'deepmerge';
import React, { ComponentProps } from 'react';
import { Linking, Text } from 'react-native';
import { getBuildNumber, getVersion } from 'react-native-device-info';
import { MarkdownView } from 'react-native-markdown-view';
import styled from 'styled-components/native';
import { SidebarParamList } from '../../../routes/Sidebar';
import SvgDemocracyBubble from '@democracy-deutschland/mobile-ui/src/components/Icons/DemocracyBubble';
import { Space } from '../Verification/Start';
import { MadeWithLove } from '../../../components/MadeWithLove';

const Wrapper = styled.ScrollView.attrs({
  scrollIndicatorInsets: { right: 1 }, // TODO do cleanfix when there is a correct solution (already closed but not solved without workaround) https://github.com/facebook/react-native/issues/26610
})``;

const Content = styled.View`
  padding-horizontal: 18px;
`;

const HeaderWrapper = styled.View`
  padding-vertical: 18px;
  align-items: center;
`;

const QuotWrapper = styled.View`
  flex-direction: row;
`;

const Quot = styled.Text`
  font-size: 100px;
  color: #4494d3;
  top: -18px;
`;

interface MarkdownProps {
  styles?: ComponentProps<typeof MarkdownView>['styles'];
  style?: ComponentProps<typeof MarkdownView>['style'];
}

const Markdown: React.FC<MarkdownProps> = ({
  children,
  styles = {},
  style = {},
}) => {
  const markdownStyles = deepmerge(
    {
      paragraph: {
        color: '#555',
        ...(styles.paragraph || []),
      },
    },
    styles,
  );

  return (
    <MarkdownView
      styles={markdownStyles}
      style={style}
      onLinkPress={url => {
        Linking.openURL(url).catch(error =>
          console.warn('An error occurred: ', error),
        );
      }}>
      {children}
    </MarkdownView>
  );
};

type AboutScreenNavigationProp = DrawerNavigationProp<
  SidebarParamList,
  'About'
>;

type Props = {
  navigation: AboutScreenNavigationProp;
};

export const AboutScreen: React.FC<Props> = () => {
  return (
    <Wrapper>
      <Content>
        <HeaderWrapper>
          <SvgDemocracyBubble width="125" height="125" color="#000" />
          <Text
            style={{
              paddingTop: 18,
            }}>
            Version {getVersion()} ({getBuildNumber()})
          </Text>
          <Text>Made with ??? by DEMOCRACY Deutschland e.V.</Text>
        </HeaderWrapper>
        <Markdown
          styles={{
            paragraph: {
              fontSize: 15,
            },
          }}>
          {`[DEMOCRACY Deutschland e.V.](https://www.democracy-deutschland.de) ist ein gemeinn??tziger Verein, der mit seiner gleichnamigen App _DEMOCRACY_ Demokratie direkter und repr??sentativer machen will. 

Als crowd-finanzierte und politisch unabh??ngige Plattform informiert die App ??ber die aktuellen Bundestagsabstimmungen und erm??glicht den Nutzern eine eigene direkte Abstimmung.        
`}
        </Markdown>
        <QuotWrapper>
          <Quot>???</Quot>
          <Markdown
            style={{
              paddingRight: 100,
            }}
            styles={{
              paragraph: {
                fontSize: 15,
              },
            }}>
            {`Mit DEMOCRACY wollen wir eine ??ffentliche Infrastruktur zur Verf??gung stellen, die das Funktionieren einer lebendigen Demokratie beg??nstigt.

Der Weisheit letzter Schluss liegt f??r uns in der solidarischen Kooperation (Gemeinschaftlichkeit) zum Vorteil aller (Gemeinn??tzigkeit). 

Deshalb ist es f??r uns selbstverst??ndlich, nicht nur alle Abstimmungsergebnisse anonymisiert, sondern auch unseren Source-Code offen zu legen (Transparenz). 

Und weil Profitinteressen die Idee nur korrumpieren w??rden, haben wir uns auch ??u??erlich eine Rechtsform gegeben, die eine Verfremdung oder Bereicherungsabsicht per Satzung f??r immer ausschlie??t. 

DEMOCRACY ist und bleibt spendenfinanziert. 

Alle entstehenden Nutzerdaten sind gerade keine handelbaren Wirtschaftsg??ter, sondern im Sinne des Grundgesetzes zu sch??tzen. Datenverkauf und Werbefinanzierung finden bei unserem Vorhaben keinen Platz.

_Marius Kr??ger im September 2017_
`}
          </Markdown>
        </QuotWrapper>
        <Markdown
          styles={{
            paragraph: {
              fontSize: 15,
            },
          }}>
          {`Nach wie vor gilt unser gr????ter Dank den 542 Unterst??tzerinnen und Unterst??tzern unserer initialen [Crowdfunding-Kampagne](https://www.startnext.com/democracy), ohne die es nicht m??glich gewesen w??re, DEMOCRACY ??berhaupt umzusetzen.

Neben den initialen Projektunterst??tzungen ziehen wir unseren Hut vor den zahlreichen [Paten und Patinnen](https://www.democracy-deutschland.de/#!donate), die mit ihrer regelm????igen Spende mithelfen, die k??hne Vision einer unabh??ngigen und nachhaltigen Crowdfinanzierung von DEMOCRACY bereits jetzt zu realisieren.
 
Unsere Arbeit ist und bleibt unabh??ngig, ??berparteilich, allgemeinn??tzig und nicht-kommerziell ??? von Menschen f??r Menschen.

F??r mehr Informationen:
[democracy-deutschland.de](https://www.democracy-deutschland.de)
`}
        </Markdown>
        <Space />
      </Content>
      <MadeWithLove />
    </Wrapper>
  );
};
