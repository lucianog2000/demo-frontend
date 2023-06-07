'use client';

import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@apollo/client';

import { tokenHelper } from '@/shared/config/token.config';
import { GET_POOL_PRICE } from '@/shared/lib/graphql/queries';

import ChartInfoStyles from './ChartInfo.module.scss';
import { Props } from './type';

function ChartInfo({ baseToken, targetToken, poolId }: Props) {
  const [tokenPrice, setTokenPrice] = useState<string>('0');
  const { data } = useQuery(GET_POOL_PRICE, {
    variables: {
      poolId,
    },
    pollInterval: 10000,
  });
  const currentDateTime = DateTime.now().toUTC();

  useEffect(() => {
    if (data !== undefined) {
      if (data.pool.token0.id === baseToken) {
        const price = Number(data.pool.token1Price).toFixed(4);
        setTokenPrice(price);
      }
      if (data.pool.token1.id === baseToken) {
        const price = Number(data.pool.token0Price).toFixed(4);
        setTokenPrice(price);
      }
    }
  }, [baseToken, data]);

  return (
    <div className={ChartInfoStyles.information}>
      <div className={ChartInfoStyles.tokens}>
        <div className={ChartInfoStyles.icons}>
          <Image
            className={ChartInfoStyles.icon}
            alt={tokenHelper[baseToken].name}
            src={tokenHelper[baseToken].icon}
            width={23}
            height={23}
          />
          <Image
            className={ChartInfoStyles.icon}
            alt={tokenHelper[targetToken].name}
            src={tokenHelper[targetToken].icon}
            width={23}
            height={23}
          />
        </div>
        <p>{`${tokenHelper[baseToken].name}/${tokenHelper[targetToken].name}`}</p>
      </div>
      <div className={ChartInfoStyles.tradeInfo}>
        <span className={ChartInfoStyles.boltText}>{tokenPrice}</span>{' '}
        {`${tokenHelper[baseToken].slug}/${tokenHelper[targetToken].slug}`}
      </div>
      <p className={ChartInfoStyles.date}>
        {currentDateTime.toFormat('LLL dd, yyyy, h:mm a')} (UTC)
      </p>
    </div>
  );
}

export default ChartInfo;
