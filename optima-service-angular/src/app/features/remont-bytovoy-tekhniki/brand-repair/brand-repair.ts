import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BrandHero } from '../../../shared/components/brand-hero/brand-hero';
import { CategoriesGrid } from '../../../shared/components/categories-grid/categories-grid';
import { ProcessAccordion } from '../../../shared/components/process-accordion/process-accordion';
import { PageProgressNavComponent } from '../../../shared/components/page-progress-nav/page-progress-nav';
import { ReviewsSection } from '../../../shared/components/reviews-section/reviews-section';
import { FaqSection } from '../../../shared/components/faq-section/faq-section';
import { DEVICE_REPAIR_DATA, DeviceRepairData } from '../device-repair/device-repair-data';
import { BreadcrumbItem } from '../../../shared/components/breadcrumb/breadcrumb';
import { BRAND_REPAIR_DATA, BrandRepairData } from './brand-repair-data';
import { IT_REPAIR_DATA } from '../../remont-kompyuterov/it-repair-data';
import { IT_BRAND_REPAIR_DATA } from '../../remont-kompyuterov/it-brand-repair-data';
import { AV_REPAIR_DATA } from '../../remont-audiovideo/av-repair-data';
import { AV_BRAND_REPAIR_DATA } from '../../remont-audiovideo/av-brand-repair-data';
import { PHONE_REPAIR_DATA } from '../../remont-telefonov/phone-repair-data';
import { PHONE_BRAND_REPAIR_DATA } from '../../remont-telefonov/phone-brand-repair-data';
import { MastersTeam } from '../../../shared/components/masters-team/masters-team';
import { PhoneModel, getPhoneModels, findPhoneModel } from '../../remont-telefonov/phone-models-data';
import { NotFound } from '../../not-found/not-found';

@Component({
  selector: 'app-brand-repair',
  standalone: true,
  imports: [CommonModule, BrandHero, CategoriesGrid, ProcessAccordion, PageProgressNavComponent, ReviewsSection, FaqSection, MastersTeam, NotFound],
  templateUrl: './brand-repair.html',
  styleUrl: './brand-repair.scss'
})
export class BrandRepairPage implements OnInit, OnDestroy {
  brandData: BrandRepairData | null = null;
  deviceData: DeviceRepairData | null = null;
  backPath = '/remont-bytovoy-tekhniki';
  sectionLabel = 'Бытовая техника';
  breadcrumbs: BreadcrumbItem[] = [];

  models: PhoneModel[] = [];
  activeModel: PhoneModel | null = null;
  brandBasePath = '';

  private paramsSub?: Subscription;
  private currentKey = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scroller: ViewportScroller,
    private title: Title,
    private meta: Meta,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Первичная отрисовка + реакция на все последующие навигации.
    // Используем NavigationEnd (а не route.paramMap): при matcher-роуте
    // компонент переиспользуется, а paramMap не всегда переэмитит при
    // навигации «назад» между вариантами с разным числом сегментов.
    // NavigationEnd срабатывает всегда — читаем актуальный snapshot.
    this.render();
    this.paramsSub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.render());
  }

  private render(): void {
    // Разбираем сегменты из актуального URL, а не из route.snapshot.paramMap:
    // при matcher-роуте с переиспользованием компонента params у snapshot не
    // обновляются при навигации «назад». router.url всегда актуален.
    // Формат: /{section-base}/{slug}/{brand}/{model?} — база всегда 1 сегмент.
    // Исключение — «Ремонт телефонов»: там нет сегмента slug (единственный
    // вид техники в разделе), поэтому бренд и модель сдвинуты на 1 сегмент влево.
    const path = this.router.url.split('?')[0].split('#')[0];
    const seg = path.split('/').filter(Boolean);
    const section = this.route.snapshot.data['section'] ?? 'appliances';
    const slug = section === 'phones' ? 'smartfony' : seg[1] ?? '';
    const brand = (section === 'phones' ? seg[1] : seg[2]) ?? '';
    const model = (section === 'phones' ? seg[2] : seg[3]) ?? null;
    this.backPath = this.route.snapshot.data['backPath'] ?? '/remont-bytovoy-tekhniki';

    this.sectionLabel = section === 'computers' ? 'Компьютеры'
                      : section === 'av' ? 'Аудио и видео'
                      : section === 'phones' ? 'Телефоны'
                      : 'Бытовая техника';

    const deviceMap = section === 'computers' ? IT_REPAIR_DATA
                    : section === 'av' ? AV_REPAIR_DATA
                    : section === 'phones' ? PHONE_REPAIR_DATA
                    : DEVICE_REPAIR_DATA;
    const brandMap = section === 'computers' ? IT_BRAND_REPAIR_DATA
                   : section === 'av' ? AV_BRAND_REPAIR_DATA
                   : section === 'phones' ? PHONE_BRAND_REPAIR_DATA
                   : BRAND_REPAIR_DATA;

    this.deviceData = (deviceMap as Record<string, DeviceRepairData>)[slug] ?? null;
    this.brandData = (brandMap as Record<string, Record<string, BrandRepairData>>)[slug]?.[brand] ?? null;

    if (!this.brandData || !this.deviceData) {
      // Показываем 404 на этом же URL вместо тихого увода на backPath —
      // см. пояснение в device-repair.ts.
      this.cdr.markForCheck();
      return;
    }

    // Скроллим вверх только при смене бренда/устройства, а не при выборе
    // модели — иначе страница будет «прыгать» вверх на каждый таб.
    const brandKey = `${section}/${slug}/${brand}`;
    if (brandKey !== this.currentKey) {
      this.scroller.scrollToPosition([0, 0]);
      this.currentKey = brandKey;
    }

    // У телефонов нет сегмента вида техники в URL — бренд идёт сразу за backPath.
    const deviceBasePath = section === 'phones' ? this.backPath : `${this.backPath}/${slug}`;
    this.brandBasePath = `${deviceBasePath}/${brand}`;
    this.models = getPhoneModels(section, slug, brand);
    this.activeModel = findPhoneModel(this.models, model);

    this.breadcrumbs = section === 'phones'
      ? [
          { label: 'Главная', path: '/' },
          { label: this.sectionLabel, path: this.backPath },
          this.activeModel
            ? { label: this.brandData.brandName, path: this.brandBasePath }
            : { label: this.brandData.brandName }
        ]
      : [
          { label: 'Главная', path: '/' },
          { label: this.sectionLabel, path: this.backPath },
          { label: this.deviceData.name, path: deviceBasePath },
          this.activeModel
            ? { label: this.brandData.brandName, path: this.brandBasePath }
            : { label: this.brandData.brandName }
        ];
    if (this.activeModel) {
      this.breadcrumbs.push({ label: this.activeModel.name });
    }

    this.updateMeta();

    // Zoneless: подписка на router.events сама по себе не запускает change
    // detection (в отличие от клика по routerLink). При навигации «назад»
    // без этого вид не обновится, хотя данные уже актуальны.
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.paramsSub?.unsubscribe();
  }

  get modelName(): string {
    return this.activeModel?.name ?? '';
  }

  get activeModelSlug(): string | null {
    return this.activeModel?.slug ?? null;
  }

  private updateMeta(): void {
    if (!this.brandData) return;

    const model = this.activeModel;
    if (model) {
      this.title.setTitle(`Ремонт ${this.brandData.brandName} ${model.name} в Ростове-на-Дону — Optima Сервис`);
      this.meta.updateTag({
        name: 'description',
        content: `Ремонт ${this.brandData.brandName} ${model.name} в Ростове-на-Дону. Замена дисплея, аккумулятора, ремонт после залития. Оригинальные запчасти, гарантия до 90 дней.`
      });
    } else {
      this.title.setTitle(this.brandData.meta.title);
      this.meta.updateTag({ name: 'description', content: this.brandData.meta.description });
    }
  }
}
