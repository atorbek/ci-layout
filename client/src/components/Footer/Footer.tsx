import React from 'react';
import './Footer.css';
import './_space/Footer_spaceH_m.css';
import '../Text/Text.css';
import '../Text/_size/Text_size_m.css';
import '../Text/_view/Text_view_secodary.css';
import '../Text/_line-height/Text_line-height_xxs.css';
import '../Text/_line-height/Text_line-height_xxxs.css';
import '../Text/_indent-r/Text_indent-r_xs.css';
import FooterContent from './Content/FooterContent';
import FooterList from './List/FooterList';
import List from '../List/List';
import ListItem from '../List/Item/List-Item';
import FooterCopyright from './Copyright/FooterCopyright';
import { cn } from '../../config';

declare interface FooterProps {
  mix?: string[];
}
const Footer: React.FC<FooterProps> = ({ mix }) => {
  return (
    <div className={cn('footer')({ spaceH: 'm' }, mix)}>
      <FooterContent>
        <FooterList>
          <List indentT="xs">
            <ListItem
              mix={[
                'text',
                'text_lineHeight_xxxs',
                'text_size_m',
                'text_indentR_xs'
              ]}
            >
              Support
            </ListItem>
            <ListItem mix={['text', 'text_lineHeight_xxxs', 'text_size_m']}>
              Learning
            </ListItem>
          </List>
        </FooterList>
        <FooterCopyright
          mix={[
            'text',
            'text_lineHeight_xxs',
            'text_size_m',
            'text_view_secondary',
            'text_indentR_xs'
          ]}
        >
          © 2020 Your Name
        </FooterCopyright>
      </FooterContent>
    </div>
  );
};

export default Footer;
