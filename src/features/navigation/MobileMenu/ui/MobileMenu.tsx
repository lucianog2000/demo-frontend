'use client';

import React from 'react';

import MobileNavLink from '@/shared/ui/links/MobileNavLink/MobileNavLink';

import MobileMenuStyles from './MobileMenu.module.scss';

function MobileMenu() {
  return (
    <nav className={MobileMenuStyles.nav}>
      <MobileNavLink href="/" exact>
        Main
      </MobileNavLink>
      <MobileNavLink href="/documentation" exact>
        Documentation
      </MobileNavLink>
    </nav>
  );
}

export default MobileMenu;