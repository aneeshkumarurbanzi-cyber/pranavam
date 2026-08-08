'use client'

import { useState } from 'react'
import { T, Lang } from '@/lib/data'
import {
  MapPin,
  Car,
  Utensils,
  Hotel,
  Sparkles,
  Camera,
  Brain,
  Check,
  Star,
  ArrowRight,
  CalendarDays,
  Users,
  Compass,
} from 'lucide-react'

type Page =
  | 'home'
  | 'about'
  | 'services'
  | 'products'
  | 'travel'
  | 'gallery'
  | 'community'
  | 'school'
  | 'contact'

interface TravelPageProps {
  lang: Lang
  go: (page: Page) => void
  openPaypalModal: (service: string, amount: number) => void
}

interface TourItem {
  nm: string
  ds: string
  duration: string
  price: string
  amt: number
}

interface Temple {
  name: string
  location: string
  image: string
  fallback: string
}

const TOUR_FALLBACKS = [
  '1625807161536-27903f2200fa',
  '1582510003544-4d00b7f74220',
  '1619239632374-9e6651c2b7bb',
  '1697730420879-dc2a8dbaa31f',
  '1578326526526-fd998049d297',
]

export default function TravelPage({
  lang,
  go,
  openPaypalModal,
}: TravelPageProps) {
  const t = T[lang]
  const dt = t.detTravel

  const items = dt.items as ReadonlyArray<TourItem>

  const [activeTemple, setActiveTemple] = useState(0)

  /*
   * ----------------------------------------------------
   * TOUR FEATURES
   * ----------------------------------------------------
   */

  const features = [
    {
      icon: MapPin,
      title: lang === 'ru' ? 'Посещение храмов' : 'Temple Visits',
    },
    {
      icon: Car,
      title: lang === 'ru' ? 'Частный транспорт' : 'Private Vehicle',
    },
    {
      icon: Utensils,
      title: lang === 'ru' ? 'Питание' : 'Meals',
    },
    {
      icon: Hotel,
      title: lang === 'ru' ? 'Проживание' : 'Accommodation',
    },
    {
      icon: Sparkles,
      title: lang === 'ru' ? 'Особая пуджа' : 'Special Pooja',
    },
    {
      icon: Camera,
      title: lang === 'ru' ? 'Фотография' : 'Photography',
    },
    {
      icon: Brain,
      title: lang === 'ru' ? 'Медитация' : 'Meditation',
    },
  ]

  /*
   * ----------------------------------------------------
   * TEMPLE HIGHLIGHTS
   * ----------------------------------------------------
   */

  const temples: Temple[] = [
    {
      name: 'Padmanabhaswamy Temple',
      location: 'Thiruvananthapuram',
      image: '/pranavam_images/temple_padmanabhaswamy.png',
      fallback:
        '1582510003544-4d00b7f74220',
    },
    {
      name: 'Thiruvallam Sree Parasurama Temple',
      location: 'Thiruvananthapuram',
      image: '/pranavam_images/temple_thiruvallam.png',
      fallback:
        '1625807161536-27903f2200fa',
    },
    {
      name: 'Attukal Bhagavathy Temple',
      location: 'Thiruvananthapuram',
      image: '/pranavam_images/temple_attukal.png',
      fallback:
        '1619239632374-9e6651c2b7bb',
    },
    {
      name: 'Suchindram Thanumalayan Temple',
      location: 'Kanyakumari',
      image: '/pranavam_images/temple_suchindram.png',
      fallback:
        '1697730420879-dc2a8dbaa31f',
    },
    {
      name: 'Kanyakumari Temple',
      location: 'Kanyakumari',
      image: '/pranavam_images/temple_kanyakumari.png',
      fallback:
        '1578326526526-fd998049d297',
    },
    {
      name: 'Vaikom Mahadeva Temple',
      location: 'Vaikom',
      image: '/pranavam_images/temple_vaikom.png',
      fallback:
        '1582510003544-4d00b7f74220',
    },
    {
      name: 'Ettumanoor Mahadeva Temple',
      location: 'Kottayam',
      image: '/pranavam_images/temple_ettumanoor.png',
      fallback:
        '1625807161536-27903f2200fa',
    },
    {
      name: 'Chottanikkara Bhagavathy Temple',
      location: 'Ernakulam',
      image: '/pranavam_images/temple_chottanikkara.png',
      fallback:
        '1619239632374-9e6651c2b7bb',
    },
  ]

  /*
   * ----------------------------------------------------
   * MAP LOCATIONS
   * ----------------------------------------------------
   */

  const mapLocations = [
    {
      name: 'Thiruvananthapuram',
      temple: 'Padmanabhaswamy',
      x: 28,
      y: 82,
    },
    {
      name: 'Kanyakumari',
      temple: 'Kanyakumari Temple',
      x: 22,
      y: 94,
    },
    {
      name: 'Vaikom',
      temple: 'Vaikom Mahadeva',
      x: 42,
      y: 52,
    },
    {
      name: 'Ettumanoor',
      temple: 'Ettumanoor Mahadeva',
      x: 45,
      y: 47,
    },
    {
      name: 'Chottanikkara',
      temple: 'Chottanikkara Bhagavathy',
      x: 55,
      y: 39,
    },
    {
      name: 'Sabarimala',
      temple: 'Sabarimala',
      x: 52,
      y: 58,
    },
  ]

  /*
   * ----------------------------------------------------
   * WHY CHOOSE GURUJI
   * ----------------------------------------------------
   */

  const whyChoose = [
    lang === 'ru'
      ? 'Личные благословения'
      : 'Personal blessings',

    lang === 'ru'
      ? 'Традиционные ведические ритуалы'
      : 'Traditional Vedic rituals',

    lang === 'ru'
      ? 'Аутентичные местные знания'
      : 'Authentic local knowledge',

    lang === 'ru'
      ? 'Частный транспорт'
      : 'Private transportation',

    lang === 'ru'
      ? 'Небольшие группы'
      : 'Small group experience',

    lang === 'ru'
      ? 'Помощь при посещении храмов'
      : 'Temple entry support',

    lang === 'ru'
      ? 'Подобранное проживание'
      : 'Handpicked accommodations',

    lang === 'ru'
      ? 'Духовное консультирование'
      : 'Spiritual counselling',
  ]

  /*
   * ----------------------------------------------------
   * TESTIMONIALS
   * ----------------------------------------------------
   */

  const testimonials =
    lang === 'ru'
      ? [
          {
            quote:
              'Я приехала посетить храмы. А вернулась с ощущением настоящего внутреннего покоя.',
            name: 'Sarah',
            country: 'США',
          },
          {
            quote:
              'Незабываемое духовное путешествие, которое я буду помнить всю жизнь.',
            name: 'Michael',
            country: 'Германия',
          },
          {
            quote:
              'Организация, ритуалы и забота команды сделали поездку по-настоящему особенной.',
            name: 'Anna',
            country: 'Великобритания',
          },
        ]
      : [
          {
            quote:
              'I came for temple visits. I returned with peace.',
            name: 'Sarah',
            country: 'USA',
          },
          {
            quote:
              'A once in a lifetime spiritual experience.',
            name: 'Michael',
            country: 'Germany',
          },
          {
            quote:
              'The rituals, guidance and hospitality made this journey truly unforgettable.',
            name: 'Anna',
            country: 'United Kingdom',
          },
        ]

  return (
    <section className="sec dk2-s travel-detail-page">
      <div className="inn">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="sh rv">
          <span className="eyebrow">
            {dt.ey}
          </span>

          <h2 className="st">
            {dt.tl}
          </h2>

          <p className="ss">
            {dt.sub}
          </p>
        </div>

        {/* =================================================
            BANNER
        ================================================= */}

        <div className="page-banner rv travel-main-banner">
          <img
            src="/pranavam_images/travel_banner.png"
            onError={(e) => {
              ;(
                e.target as HTMLImageElement
              ).src =
                'https://images.unsplash.com/photo-1641666017842-f94246ef2961?w=1200&h=400&fit=crop&q=85'
            }}
            alt="Kerala Sacred Travel"
          />

          <div className="travel-banner-overlay">
            <span>
              {lang === 'ru'
                ? 'Священное путешествие'
                : 'A Sacred Journey'}
            </span>

            <h3>
              {lang === 'ru'
                ? 'Откройте духовное наследие Кералы'
                : 'Discover the Spiritual Heritage of Kerala'}
            </h3>
          </div>
        </div>

        {/* =================================================
            FEATURE ICONS
        ================================================= */}

        <div className="travel-features rv">

          {features.map(
            ({
              icon: Icon,
              title,
            }) => (
              <div
                key={title}
                className="travel-feature"
              >
                <div className="travel-feature-icon">
                  <Icon size={25} />
                </div>

                <span>
                  {title}
                </span>
              </div>
            )
          )}

        </div>

        {/* =================================================
            TOURS
        ================================================= */}

        <div className="travel-tours">

          {items.map(
            (tour, idx) => (
              <article
                key={idx}
                className="travel-tour-card rv"
              >

                <div className="travel-tour-image">

                  <img
                    src={`/pranavam_images/tour_${
                      idx + 1
                    }.png`}
                    onError={(e) => {
                      ;(
                        e.target as HTMLImageElement
                      ).src =
                        `https://images.unsplash.com/photo-${TOUR_FALLBACKS[
                          idx %
                            TOUR_FALLBACKS.length
                        ]}?w=900&h=600&fit=crop&q=85`
                    }}
                    alt={tour.nm}
                  />

                  <div className="travel-tour-duration">
                    <CalendarDays
                      size={15}
                    />

                    {tour.duration}
                  </div>

                </div>

                <div className="travel-tour-content">

                  <div className="travel-tour-number">
                    0{idx + 1}
                  </div>

                  <h3>
                    {tour.nm}
                  </h3>

                  <p>
                    {tour.ds}
                  </p>

                  <div className="travel-tour-bottom">

                   

                   <button
              className="btn b-pri"
              onClick={() =>
                go('contact')
              }
            >
              {lang === 'ru'
                ? 'Обсудить путешествие'
                : 'Plan Your Journey'}

              <ArrowRight
                size={18}
              />
            </button>
                  </div>

                </div>

              </article>
            )
          )}

        </div>

        {/* =================================================
            SOUTH KERALA HIGHLIGHTS
        ================================================= */}

        <section className="travel-highlights rv">

          <div className="travel-section-heading">

            <span className="eyebrow">
              {lang === 'ru'
                ? 'Места силы'
                : 'Sacred Destinations'}
            </span>

            <h2>
              {lang === 'ru'
                ? 'Храмы, которые вы посетите'
                : 'Temple Highlights'}
            </h2>

            <p>
              {lang === 'ru'
                ? 'Откройте древние храмы и священные места Южной Кералы.'
                : 'Discover ancient temples and sacred destinations across South Kerala.'}
            </p>

          </div>

          <div className="temple-layout">

            {/* BIG IMAGE */}

            <div className="temple-feature-image">

              <img
                src={
                  temples[
                    activeTemple
                  ].image
                }
                onError={(e) => {
                  ;(
                    e.target as HTMLImageElement
                  ).src =
                    `https://images.unsplash.com/photo-${
                      temples[
                        activeTemple
                      ].fallback
                    }?w=1000&h=800&fit=crop&q=85`
                }}
                alt={
                  temples[
                    activeTemple
                  ].name
                }
              />

              <div className="temple-feature-overlay">

                <span>
                  {temples[
                    activeTemple
                  ].location}
                </span>

                <h3>
                  {temples[
                    activeTemple
                  ].name}
                </h3>

              </div>

            </div>

            {/* TEMPLE LIST */}

            <div className="temple-list">

              {temples.map(
                (temple, index) => (
                  <button
                    key={temple.name}
                    className={`temple-list-item ${
                      activeTemple === index
                        ? 'active'
                        : ''
                    }`}
                    onClick={() =>
                      setActiveTemple(
                        index
                      )
                    }
                  >

                    <div className="temple-thumb">

                      <img
                        src={temple.image}
                        onError={(e) => {
                          ;(
                            e.target as HTMLImageElement
                          ).src =
                            `https://images.unsplash.com/photo-${temple.fallback}?w=200&h=150&fit=crop&q=80`
                        }}
                        alt=""
                      />

                    </div>

                    <div>

                      <strong>
                        {temple.name}
                      </strong>

                      <small>
                        <MapPin
                          size={13}
                        />

                        {temple.location}
                      </small>

                    </div>

                  </button>
                )
              )}

            </div>

          </div>

        </section>

        {/* =================================================
            INTERACTIVE KERALA MAP
        ================================================= */}

       

        {/* =================================================
            WHY CHOOSE GURUJI
        ================================================= */}

        <section className="why-guruji rv">

          <div className="why-guruji-content">

            <span className="eyebrow">
              {lang === 'ru'
                ? 'Почему мы'
                : 'The Guruji Difference'}
            </span>

            <h2>
              {lang === 'ru'
                ? 'Что делает это путешествие особенным'
                : 'What Makes This Special'}
            </h2>

            <p>
              {lang === 'ru'
                ? 'Это не просто поездка по храмам. Это тщательно организованное духовное путешествие, созданное для глубокого знакомства с традициями Кералы.'
                : 'This is more than a temple tour. It is a carefully curated spiritual journey designed to help you experience Kerala through its traditions, rituals and sacred places.'}
            </p>

            <button
              className="btn b-pri"
              onClick={() =>
                go('contact')
              }
            >
              {lang === 'ru'
                ? 'Обсудить путешествие'
                : 'Plan Your Journey'}

              <ArrowRight
                size={18}
              />
            </button>

          </div>

          <div className="why-guruji-grid">

            {whyChoose.map(
              (item) => (
                <div
                  key={item}
                  className="why-guruji-item"
                >
                  <div>
                    <Check
                      size={17}
                    />
                  </div>

                  <span>
                    {item}
                  </span>
                </div>
              )
            )}

          </div>

        </section>

        {/* =================================================
            TESTIMONIALS
        ================================================= */}

        <section className="travel-testimonials rv">

          <div className="travel-section-heading">

            <span className="eyebrow">
              {lang === 'ru'
                ? 'Отзывы путешественников'
                : 'Traveler Stories'}
            </span>

            <h2>
              {lang === 'ru'
                ? 'Путешествие, которое остаётся с вами'
                : 'A Journey That Stays With You'}
            </h2>

          </div>

          <div className="travel-testimonial-grid">

            {testimonials.map(
              (testimonial) => (
                <article
                  key={
                    testimonial.name
                  }
                  className="travel-testimonial"
                >

                  <div className="testimonial-stars">

                    {[1, 2, 3, 4, 5].map(
                      (star) => (
                        <Star
                          key={star}
                          size={16}
                          fill="currentColor"
                        />
                      )
                    )}

                  </div>

                  <p>
                    “
                    {
                      testimonial.quote
                    }
                    ”
                  </p>

                  <div className="testimonial-author">

                    <div className="testimonial-avatar">
                      {
                        testimonial.name.charAt(
                          0
                        )
                      }
                    </div>

                    <div>
                      <strong>
                        {
                          testimonial.name
                        }
                      </strong>

                      <span>
                        {
                          testimonial.country
                        }
                      </span>
                    </div>

                  </div>

                </article>
              )
            )}

          </div>

        </section>

        {/* =================================================
            CUSTOM INQUIRY
        ================================================= */}

        <div
          className="sch-form-wrap travel-inquiry rv"
          style={{
            maxWidth: '760px',
            textAlign: 'center',
          }}
        >

          <Compass
            size={35}
            className="travel-inquiry-icon"
          />

          <h3>
            {dt.formTl}
          </h3>

          <p>
            {dt.formSub}
          </p>

          <button
            className="btn b-pri"
            onClick={() =>
              go('contact')
            }
          >
            {dt.formBtn}

            <ArrowRight
              size={17}
            />
          </button>

        </div>

      </div>
    </section>
  )
}