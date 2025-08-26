'use client'

function CEOQuote() {
  return (
    <section className="relative flex w-full flex-col items-center justify-center py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="relative mb-20 flex w-full flex-col items-center justify-center">
        <div
          className="absolute inset-0 -top-40 z-0"
          style={{ maskImage: 'linear-gradient(transparent, white, white)' }}
        ></div>

        <div className="relative flex flex-row items-center gap-24">
          <blockquote className="text-body-01 md:text-header-02 mx-auto mb-8 max-w-3xl text-left !leading-relaxed font-medium text-balance text-slate-700">
            안녕하세요, 어나더닥터를 찾아주셔서 감사합니다.
            <br />
            <br />
            저는 지난 20여 년간 임상 현장에서 환자분들께 최상의 치료를 제공하기
            위해 끊임없이 고민해 왔습니다. 단순히 치료에 머무르지 않고, 어떤
            선택과 행동이 환자 개인은 물론 인류 전체에 긍정적인 영향을 미칠 수
            있을지 깊이 생각해왔습니다.
            <br />
            <br />
            저희 어나더닥터의 목표는 메디컬 분야에 여전히 남아 있는 관습적이고
            시대착오적인 오류들을 AI 디지털 혁신 기술로 개선하는 것입니다. 이를
            통해 진료진의 역량을 상향 표준화하고, 진료 체계를 효율화하여, 더
            많은 분들께 양질의 의료 서비스를 공평하게 제공하고자 합니다.
            <br />
            <br />더 나아가, 어나더닥터는 전 세계 유일의 글로벌 치과 헬스케어
            플랫폼으로 자리매김하여 한국 K-MEDI의 저력을 보여드리겠습니다.
            테크놀로지와 소프트웨어, 그리고 AI 기술이 결합된 어나더닥터의
            잠재성과 가능성에 많은 관심과 기대 부탁드립니다. 감사합니다.
            어나더닥터 대표 정창희 드림
          </blockquote>

          <div className="flex flex-col items-center justify-center">
            <div className="relative mb-10 inline-block h-70 w-80 overflow-hidden rounded-xl shadow-lg">
              <img
                alt="정창희"
                loading="lazy"
                decoding="async"
                data-nimg="fill"
                className="blur-0 inline-block scale-105 transition duration-300"
                sizes="100vw"
                src="/ceo-profile.png"
                style={{
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                  inset: '0px',
                  color: 'transparent',
                  objectFit: 'cover',
                }}
              />
            </div>
            <div className="flex flex-col items-center space-y-1">
              <h4 className="text-primary-900 text-center text-base font-bold md:text-lg">
                Joseph / 정창희
              </h4>
              <div className="flex items-center space-x-2">
                <span className="text-center text-xs font-medium text-slate-500 md:text-sm">
                  CEO & Founder
                </span>
                {/* <span className="h-1 w-1 rounded-full bg-slate-400"></span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { CEOQuote }
