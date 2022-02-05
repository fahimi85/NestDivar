import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Param,
  Body,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { digitsArToEn, digitsEnToFa, digitsFaToAr, digitsFaToEn } from "@persian-tools/persian-tools";
import { isNumber } from 'class-validator';
import got from 'got';
import { number } from 'joi';
import { AppKeyGuard } from 'src/common/guards/app-key.guard';
import { isPublic } from 'src/common/guards/is-public.decorator';
import { EventTypes } from 'src/event/entities/event.entity';
import { PaginationDto } from './dto/pagination.dto';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Get()
  @isPublic()
  async car() {
    var categorylist = ['انتخاب دسته بندی', "buy-old-house", "buy-villa", "buy-apartment", "buy-residential", "auto", "classic-car", "rental-car", "heavy-car", "electronic-devices", "home-kitchen", "services", "personal-goods", "entertainment", "social-services", "tools-materials-equipment", "jobs"]

    // var id: number
    // for (id = 1; id < categorylist.length + 1; id++) {
    //     await CategoriesEntity.delete(id)

    // }

    // for (var i = 0; i < categorylist.length; i++) {
    //     let name: string = categorylist[i]
    //     var cat = new CategoriesEntity();
    //     cat.id = i + 1
    //     cat.name = name;
    //     await categoryservice.insert(cat);
    // }

    var response2 = await got(`https://api.divar.ir/v8/web-search/mashhad/${categorylist[1]}`);
    var json = JSON.parse(response2.body);
    var carlist: { title: string, price: string, kilometer: string, image: ImageData }[] = []
    json.widget_list.forEach((item: { data: { description: string; title: string; image: ImageData; }; }) => {

      var descript = item.data.description
      var splitpriceANDkilometer: string[] = descript.split(`\n`)
      var kilometer: string = splitpriceANDkilometer[1];
      if (categorylist[1] == 'auto') {
        var price: string = splitpriceANDkilometer[1]
      } else {
        var price: string = splitpriceANDkilometer[0]
      } var carobject = {
        title: item.data.title,
        price: (price == undefined) ? "" : price,
        kilometer: (kilometer == undefined) ? "" : kilometer,
        image: item.data.image
      }

      carlist.push(carobject)
    });
    // for (i = 0; i < carlist.length; i++) {
    //     var advertis = new AdvertisingEntity();
    //     advertis.title = carlist[i].title;
    //     advertis.price = carlist[i].price;
    //     advertis.kilometer = carlist[i].kilometer;
    //     // Advertis.image = carobject.image;

    //     await adservice.insert(advertis);

    // }
    let main3 = `
    <div3><label for="Category">Please Choose Your Category and enter in the url:</label>
    <select name="Category" id="Category" onchange="document.location.href = '/post/' + this.value">`
    for (let i = 0; i < categorylist.length; i++) {
      main3 = main3 + `<option value="${categorylist[i]}">${categorylist[i]}</option>`
    }
    main3 = main3 + `</select><br><br>`
    // let Criticalvalue = `<br><br>`
    // main3 = main3 + `<label>Pagination:</label>< `
    // for (let i = 0; i < 10; i++) {
    //   main3 = main3 + ` <a href="http://localhost:3000/post">${i + 1}</a>`
    // }
    // main3 = main3 + ` >`
    // main3 = main3 + `<a style=" text-decoration: none;
    // " href="http://localhost:3000/post">          گزارش ساز  </a>`
    var sum = 0
    var count = 0
    var priclist = []
    var advertic = ``
    carlist.forEach(item => {
      advertic += `<div7 style="border: 1px solid #FB4805;background-color: #FF5733; margin: 6px;border-width:3px ;border-radius: 20px;color:white;width:25%;font-size:20px;direction: rtl;display: flex;flex-wrap: wrap;flex-direction: row;justify-content:center;">
                    <div8 style="display: flex;flex-wrap: wrap;flex-direction: column;">
                     <div9>${item.title}</div9>
                     <div10>${item.price}</div10>
                     <div11>${item.kilometer}</div11>
                    </div8>
                    <img style="border-radius: 15px;" src= ${item.image}>
                </div7>`
      if (item.price != "") {
        var splitpriceANDtoman: string = item.price.replace('تومان', '')
        var splitpriceANDtoman2: string = splitpriceANDtoman.replace(',', '')
        var splitpriceANDtoman3: string = splitpriceANDtoman2.replace(',', '')
        // console.log(digitsFaToEn(splitpriceANDtoman3), splitpriceANDtoman3)
        if (Number.isInteger(parseInt(digitsFaToEn(splitpriceANDtoman3)))) {
          sum = sum + parseInt(digitsFaToEn(splitpriceANDtoman3))
          priclist.push(parseInt(digitsFaToEn(splitpriceANDtoman3)))
          count++// just count define price

        }
      }
    })
    var average = Math.floor(sum / count)
    let domain = Math.max(...priclist) - Math.min(...priclist)
    let charak1 = Math.min(...priclist) + Math.floor(domain / 4)
    let charak2 = Math.min(...priclist) + Math.floor(domain / 2)
    let charak3 = Math.min(...priclist) + Math.floor((domain / 4) * 3)
    let countFistScope = 0
    let countSecondeScope = 0
    let countThiredeScope = 0
    let countFourthScope = 0
    priclist.forEach(item => {
      if (item >= Math.min(...priclist) && item < charak1) {
        countFistScope++
      } else if (item >= charak1 && item < charak2) {
        countSecondeScope++
      } else if (item >= charak2 && item < charak3) {
        countThiredeScope++
      } else if (item >= charak3 && Math.max(...priclist) >= item) {
        countFourthScope++
      }
    })

    let percentFistScope = ((countFistScope / count) * 100).toFixed(2)
    let percentSecondeScope = ((countSecondeScope / count) * 100).toFixed(2)
    let percentThiredScope = ((countThiredeScope / count) * 100).toFixed(2)
    let percentFourthScope = ((countFourthScope / count) * 100).toFixed(2)

    var chart = `<div30 style="
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-around;"><div130 style="
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: right;">
        <div30111 style="
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: left;"><label> price between ${Math.min(...priclist)}-${charak1}</label>
        <div3011 style="
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: left;">
        <div301 style="border: 1px solid #FB4805;background-color: #E56997;margin:5px;border-radius: 2px;color:white;width:${percentFistScope};height: 30px;font-size:20px;direction: rtl;display: flex;flex-wrap: wrap;flex-direction: row;justify-content:center;">
        </div301><label><h3>${percentFistScope}%</h3></label>
        </div3011>
        </div30111>
        <div30222 style="
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: left;"><label> price between ${charak1}-${charak2}</label>
        <div3022 style="
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: left;">
        <div302 style="border: 1px solid #FB4805;background-color: #BD97CB;margin:5px;border-width:1px ;border-radius: 2px;color:white;width:${percentSecondeScope};height: 30px;font-size:20px;direction: rtl;display: flex;flex-wrap: wrap;flex-direction: row;justify-content:center;">
        </div302><label><h3>${percentSecondeScope}%</h3></label>
        </div3022>
        </div30222>
        <div30333 style="
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: left;"><label> price between ${charak2}-${charak3}</label>
        <div3033 style="
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: left;">
        <div303 style="border: 1px solid #FB4805;background-color: #FFD700;margin:5px;border-width:1px ;border-radius: 2px;color:white;width:${percentThiredScope};height: 30px;font-size:20px;direction: rtl;display: flex;flex-wrap: wrap;flex-direction: row;justify-content:center;">
        </div303><label><h3>${percentThiredScope}%</h3></label>
        </div3033>
        </div30333>
        <div30444 style="
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: left;"><label> price between ${charak3}-${Math.max(...priclist)}</label>
        <div3044 style="
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: left;">
        <div304 style="border: 1px solid #FB4805;background-color: #66D2D6;margin:5px;border-width:1px ;border-radius: 2px;color:white;width:${percentFourthScope};height: 30px;font-size:20px;direction: rtl;display: flex;flex-wrap: wrap;flex-direction: row;justify-content:center;">
        </div304><label><h3>${percentFourthScope}%</h3></label>
        </div3044>
        </div30444>
        </div130>
        <div140>
           <div20 style="text-align:center;margin-bottom: 30px;border: 1px solid #fff;background:rgb(235, 197, 100)"><h2>تحلیل بازار</h2></div20>
           <div21 style="text-align:center;"><h3>میانگین قیمت:${digitsEnToFa(average)} تومان</h3></div21>
           <div25 style="text-align:center;"><h3>بالا ترین قیمت:${digitsEnToFa(Math.max(...priclist))} تومان</h3></div25>
           <div26 style="text-align:center;"><h3>پایین ترین قیمت:${digitsEnToFa(Math.min(...priclist))} تومان</h3></div26>
        </div140>
    </div30>`
    var car = `<h1> ${categorylist[1]} Shop</h1>`
    car += "<h2>you can campare and then choose the best</h2>"
    car += main3 + `</div3><div6 style="
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: space-around;">${chart}<div120 style="
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-around;"><div4 style="
    flex-wrap: wrap;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-around;">`+ advertic



    car += `</div4><div5><form action="#" class="form" style="flex-wrap: wrap;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    width:250px">
    <div  class="lable" style="text-align: right;margin-bottom: 30px"> 
        <label>نام کاربری</label><br>
        <input type="text"  class="form_control" required style="width: 200px;
        border: 1px solid #fff;
        background-color: rgb(240, 240, 240);
        border-color:rgb(207, 207, 207) ;
        height: 55px;">
    </div>
    <div class="lable" style="text-align: right;margin-bottom: 30px"> 
        <label>پسورد</label><br>
        <input type="text"  class="form_control" required style="width:200px;
        border: 1px solid #fff;
        background-color: rgb(240, 240, 240);
        border-color:rgb(207, 207, 207) ;
        height: 55px;">
    </div>
   
   
    <div class="lable" style="text-align: right;margin-bottom: 30px;"> 
        <input type="submit" class="button_controll" style="border: 1px solid #fff;background:rgb(235, 197, 100) ;color: rgb(255, 255, 255) ;border-color: rgb(235, 197, 100);padding: 1px;height: 60px;font-size: 21px;line-height: 60px;width: 120px;" value="ارسال">
    </div>
</form></div5></div120></div6>`
    return car
  }


  findAll() {
    return this.postService.findAll();
  }
  @Get('/:category')
  @isPublic()
  async car2(@Param('category') category) {
    var categorylist = ['انتخاب دسته بندی', "buy-old-house", "buy-villa", "buy-apartment", "buy-residential", "auto", "classic-car", "rental-car", "heavy-car", "electronic-devices", "home-kitchen", "services", "personal-goods", "entertainment", "social-services", "tools-materials-equipment", "jobs"]

    // var id: number
    // for (id = 1; id < categorylist.length + 1; id++) {
    //     await CategoriesEntity.delete(id)

    // }

    // for (var i = 0; i < categorylist.length; i++) {
    //     let name: string = categorylist[i]
    //     var cat = new CategoriesEntity();
    //     cat.id = i + 1
    //     cat.name = name;
    //     await categoryservice.insert(cat);
    // }

    var response2 = await got(`https://api.divar.ir/v8/web-search/mashhad/${category}`);
    var json = JSON.parse(response2.body);
    var carlist: { title: string, price: string, kilometer: string, image: ImageData }[] = []
    json.widget_list.forEach((item: { data: { description: string; title: string; image: ImageData; }; }) => {

      var descript = item.data.description
      var splitpriceANDkilometer: string[] = descript.split(`\n`)
      var kilometer: string = splitpriceANDkilometer[1];
      if (category == 'auto') {
        var price: string = splitpriceANDkilometer[1]
      } else {
        var price: string = splitpriceANDkilometer[0]
      }
      var carobject = {
        title: item.data.title,
        price: (price == undefined) ? "" : price,
        kilometer: (kilometer == undefined) ? "" : kilometer,
        image: item.data.image
      }

      carlist.push(carobject)
    });
    // for (i = 0; i < carlist.length; i++) {
    //     var advertis = new AdvertisingEntity();
    //     advertis.title = carlist[i].title;
    //     advertis.price = carlist[i].price;
    //     advertis.kilometer = carlist[i].kilometer;
    //     // Advertis.image = carobject.image;

    //     await adservice.insert(advertis);

    // }
    let main3 = `
    <div3><label for="Category">Please Choose Your Category and enter in the url:</label>
    <select name="Category" id="Category" onchange="document.location.href = '/post/' + this.value">`
    for (let i = 0; i < categorylist.length; i++) {
      main3 = main3 + `<option value="${categorylist[i]}">${categorylist[i]}</option>`
    }
    main3 = main3 + `</select><br><br>`
    // let Criticalvalue = `<br><br>`
    // main3 = main3 + `<label>Pagination:</label>< `
    // for (let i = 0; i < 10; i++) {
    //   main3 = main3 + ` <a href="http://localhost:3000/post">${i + 1}</a>`
    // }
    // main3 = main3 + ` >`
    // main3 = main3 + `<a style=" text-decoration: none;
    // " href="http://localhost:3000/post">          گزارش ساز  </a>`
    var sum = 0
    var count = 0
    var priclist = []
    var advertic = ``
    carlist.forEach(item => {
      advertic += `<div7 style="border: 1px solid #FB4805;background-color: #FF5733; margin: 6px;border-width:3px ;border-radius: 20px;color:white;width:25%;font-size:20px;direction: rtl;display: flex;flex-wrap: wrap;flex-direction: row;justify-content:center;">
                    <div8 style="display: flex;flex-wrap: wrap;flex-direction: column;">
                     <div9>${item.title}</div9>
                     <div10>${item.price}</div10>
                     <div11>${item.kilometer}</div11>
                    </div8>
                    <img style="border-radius: 15px;" src= ${item.image}>
                </div7>`
      if (item.price != "") {
        var splitpriceANDtoman: string = item.price.replace('تومان', '')
        var splitpriceANDtoman2: string = splitpriceANDtoman.replace(',', '')
        var splitpriceANDtoman3: string = splitpriceANDtoman2.replace(',', '')
        // console.log(digitsFaToEn(splitpriceANDtoman3), splitpriceANDtoman3)
        if (Number.isInteger(parseInt(digitsFaToEn(splitpriceANDtoman3)))) {
          sum = sum + parseInt(digitsFaToEn(splitpriceANDtoman3))
          priclist.push(parseInt(digitsFaToEn(splitpriceANDtoman3)))

        }
      }

      count++
    })
    var average = Math.floor(sum / count)
    let domain = Math.max(...priclist) - Math.min(...priclist)
    let charak1 = Math.min(...priclist) + Math.floor(domain / 4)
    let charak2 = Math.min(...priclist) + Math.floor(domain / 2)
    let charak3 = Math.min(...priclist) + Math.floor((domain / 4) * 3)

    let countFistScope = 0
    let countSecondeScope = 0
    let countThiredeScope = 0
    let countFourthScope = 0
    priclist.forEach(item => {
      if (item >= Math.min(...priclist) && item < charak1) {
        countFistScope++
      } else if (item >= charak1 && item < charak2) {
        countSecondeScope++
      } else if (item >= charak2 && item < charak3) {
        countThiredeScope++
      } else if (item >= charak3 && Math.max(...priclist) >= item) {
        countFourthScope++
      }
    })

    let percentFistScope = ((countFistScope / count) * 100).toFixed(2)
    let percentSecondeScope = ((countSecondeScope / count) * 100).toFixed(2)
    let percentThiredScope = ((countThiredeScope / count) * 100).toFixed(2)
    let percentFourthScope = ((countFourthScope / count) * 100).toFixed(2)

    var chart = `<div30 style="
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-around;"><div130 style="
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: right;">
        <div30111 style="
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: left;"><label> price between ${Math.min(...priclist)}-${charak1}</label>
        <div3011 style="
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: left;">
        <div301 style="border: 1px solid #FB4805;background-color: #E56997;margin:5px;border-radius: 2px;color:white;width:${percentFistScope};height: 30px;font-size:20px;direction: rtl;display: flex;flex-wrap: wrap;flex-direction: row;justify-content:center;">
        </div301><label><h3>${percentFistScope}%</h3></label>
        </div3011>
        </div30111>
        <div30222 style="
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: left;"><label> price between ${charak1}-${charak2}</label>
        <div3022 style="
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: left;">
        <div302 style="border: 1px solid #FB4805;background-color: #BD97CB;margin:5px;border-width:1px ;border-radius: 2px;color:white;width:${percentSecondeScope};height: 30px;font-size:20px;direction: rtl;display: flex;flex-wrap: wrap;flex-direction: row;justify-content:center;">
        </div302><label><h3>${percentSecondeScope}%</h3></label>
        </div3022>
        </div30222>
        <div30333 style="
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: left;"><label> price between ${charak2}-${charak3}</label>
        <div3033 style="
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: left;">
        <div303 style="border: 1px solid #FB4805;background-color: #FFD700;margin:5px;border-width:1px ;border-radius: 2px;color:white;width:${percentThiredScope};height: 30px;font-size:20px;direction: rtl;display: flex;flex-wrap: wrap;flex-direction: row;justify-content:center;">
        </div303><label><h3>${percentThiredScope}%</h3></label>
        </div3033>
        </div30333>
        <div30444 style="
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: left;"><label> price between ${charak3}-${Math.max(...priclist)}</label>
        <div3044 style="
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: left;">
        <div304 style="border: 1px solid #FB4805;background-color: #66D2D6;margin:5px;border-width:1px ;border-radius: 2px;color:white;width:${percentFourthScope};height: 30px;font-size:20px;direction: rtl;display: flex;flex-wrap: wrap;flex-direction: row;justify-content:center;">
        </div304><label><h3>${percentFourthScope}%</h3></label>
        </div3044>
        </div30444>
        </div130>
        <div140>
           <div20 style="text-align:center;margin-bottom: 30px;border: 1px solid #fff;background:rgb(235, 197, 100)"><h2>تحلیل بازار</h2></div20>
           <div21 style="text-align:center;"><h3>میانگین قیمت:${digitsEnToFa(average)} تومان</h3></div21>
           <div25 style="text-align:center;"><h3>بالا ترین قیمت:${digitsEnToFa(Math.max(...priclist))} تومان</h3></div25>
           <div26 style="text-align:center;"><h3>پایین ترین قیمت:${digitsEnToFa(Math.min(...priclist))} تومان</h3></div26>
        </div140>
    </div30>`
    var car = `<h1> ${category} Shop</h1>`
    car += "<h2>you can campare and then choose the best</h2>"
    car += main3 + `</div3><div6 style="
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: space-around;">${chart}<div120 style="
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-around;"><div4 style="
    flex-wrap: wrap;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-around;">`+ advertic


    car += `</div4><div5><form action="#" class="form" style="flex-wrap: wrap;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    width:250px">
    <div  class="lable" style="text-align: right;margin-bottom: 30px"> 
        <label>نام کاربری</label><br>
        <input type="text"  class="form_control" required style="width: 200px;
        border: 1px solid #fff;
        background-color: rgb(240, 240, 240);
        border-color:rgb(207, 207, 207) ;
        height: 55px;">
    </div>
    <div class="lable" style="text-align: right;margin-bottom: 30px"> 
        <label>پسورد</label><br>
        <input type="text"  class="form_control" required style="width:200px;
        border: 1px solid #fff;
        background-color: rgb(240, 240, 240);
        border-color:rgb(207, 207, 207) ;
        height: 55px;">
    </div>
    
   
    <div class="lable" style="text-align: right;margin-bottom: 30px;"> 
        <input type="submit" class="button_controll" style="border: 1px solid #fff;background:rgb(235, 197, 100) ;color: rgb(255, 255, 255) ;border-color: rgb(235, 197, 100);padding: 1px;height: 60px;font-size: 21px;line-height: 60px;width: 120px;" value="ارسال">
    </div>
</form></div5></div120></div6>`
    return car
  }


  @Get('/paginate')
  findAllPaginated(@Query() query: PaginationDto) {
    return this.postService.findAll(query);
  }

  @Get('/:id')
  @isPublic()
  findOne(@Param('id') id) {
    return this.postService.findOne(parseInt(id));
  }

  @Post('/')
  insert(@Body() body: CreatePostDto) {
    return this.postService.create(body);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdatePostDto) {
    return this.postService.update(id, body);
  }

  @Patch(':id')
  patch(@Param('id') id, @Body() body: UpdatePostDto) {
    console.log(body instanceof UpdatePostDto);
    return this.postService.update(+id, body);
  }

  @Delete(':id')
  delete(@Param('id') id) {
    return this.postService.delete(+id);
  }

  @Patch(':id/event/:type/:userId')
  like(
    @Param('id') id,
    @Param('userId') userId,
    @Param('type') type: EventTypes,
  ) {
    console.log('event');
    console.log(id);
    return this.postService.event(+id, type, userId);
  }
}
