import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

type Props = {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
};

/**
 * Counter que arranca al entrar al viewport. Si el usuario prefiere menos
 * movimiento, muestra el valor final sin animar.
 */
export function AnimatedCounter({
  end,
  suffix = '',
  prefix = '',
  duration = 2,
  decimals = 0,
  className,
}: Props) {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  if (reduced) {
    return (
      <span ref={ref} className={className}>
        {prefix}
        {end.toFixed(decimals)}
        {suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {inView ? (
        <CountUp
          end={end}
          duration={duration}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
        />
      ) : (
        <>
          {prefix}0{suffix}
        </>
      )}
    </span>
  );
}
